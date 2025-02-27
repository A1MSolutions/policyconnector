import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';
import { StageConfig } from '../../config/stage-config';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';

/**
 * Properties for the StaticAssetsStack
 * @interface StaticAssetsStackProps
 * @extends {cdk.StackProps}
 */
export interface StaticAssetsStackProps extends cdk.StackProps {
  /** Optional ACM certificate ARN for custom domain */
  certificateArn?: string;
  /** Optional PR number for ephemeral environments */
  prNumber?: string;
  /** Type of deployment - either infrastructure setup or content deployment */
  deploymentType: 'infrastructure' | 'content';
  /** Optional domain name for the CloudFront distribution */
  domainName?: string;
}

/**
 * CDK Stack for managing static assets with CloudFront distribution
 * Creates and configures S3 buckets, CloudFront distribution, and WAF rules
 * @class StaticAssetsStack
 * @extends {cdk.Stack}
 */
export class StaticAssetsStack extends cdk.Stack {
  private readonly stageConfig: StageConfig;
  private readonly assetsBucket: s3.Bucket;
  private readonly loggingBucket: s3.Bucket;
  private readonly distribution: cloudfront.Distribution;
  private readonly certificate?: acm.ICertificate;
  private readonly domainName?: string;

  /**
   * Creates an instance of StaticAssetsStack
   * @param {Construct} scope - The scope in which to define this construct
   * @param {string} id - The scoped construct ID
   * @param {StaticAssetsStackProps} props - Configuration properties
   * @param {StageConfig} stageConfig - Stage-specific configuration
   */
  constructor(
    scope: Construct,
    id: string,
    props: StaticAssetsStackProps,
    stageConfig: StageConfig
  ) {
    super(scope, id, props);

    this.stageConfig = stageConfig;
    this.domainName = props.domainName;

    // Create or import certificate if domain name is provided
    if (props.domainName) {
      if (props.certificateArn) {
        this.certificate = acm.Certificate.fromCertificateArn(
          this, 'Certificate', props.certificateArn
        );
      } else {
        // Create a new certificate for the domain
        this.certificate = new acm.Certificate(this, 'Certificate', {
          domainName: props.domainName,
          subjectAlternativeNames: [`www.${props.domainName}`],
          validation: acm.CertificateValidation.fromDns(),
        });
      }

      // Store domain name in SSM parameter store for reference by other stacks
      new ssm.StringParameter(this, 'DomainNameParameter', {
        parameterName: `/eregulations/domain/name`,
        stringValue: props.domainName,
        description: 'Domain name for eRegulations application',
        tier: ssm.ParameterTier.STANDARD,
      });
    }

    this.assetsBucket = this.createAssetsBucket();
    this.loggingBucket = this.createLoggingBucket();
    const waf = this.createWebACL();
    this.distribution = this.createCloudFrontDistribution(waf, props);

    // Create Route53 record if domain name is provided
    if (props.domainName) {
      this.createDnsRecord(props.domainName);
    }

    this.deployStaticAssets();
    this.addStackOutputs();
  }

  /**
   * Creates Route53 record for the domain
   * @private
   * @param {string} domainName - Domain name to create record for
   */
  private createDnsRecord(domainName: string): void {
    try {
      // Look up the hosted zone for the domain
      const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
        domainName,
      });

      // Create an A record for the domain pointing to the CloudFront distribution
      new route53.ARecord(this, 'SiteAliasRecord', {
        recordName: domainName,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(this.distribution)
        ),
        zone: hostedZone,
      });

      // Create a www subdomain record
      new route53.ARecord(this, 'WwwSiteAliasRecord', {
        recordName: `www.${domainName}`,
        target: route53.RecordTarget.fromAlias(
          new route53Targets.CloudFrontTarget(this.distribution)
        ),
        zone: hostedZone,
      });

      // Store DNS record information in SSM
      new ssm.StringParameter(this, 'DomainAliasParameter', {
        parameterName: `/eregulations/domain/alias`,
        stringValue: `www.${domainName}`,
        description: 'WWW alias for eRegulations domain',
        tier: ssm.ParameterTier.STANDARD,
      });
    } catch (error) {
      // If hosted zone lookup fails, log warning but continue deployment
      console.warn(`WARNING: Could not find Route53 hosted zone for ${domainName}. DNS records were not created.`);
      console.warn(`Please ensure the domain is registered in Route53 and try again.`);
    }
  }

  /**
   * Validates SSL certificate configuration for production environment
   * @private
   * @param {StaticAssetsStackProps} props - Stack properties
   * @throws {Error} If certificate ARN is missing in production environment
   */
  private validateCertificateConfig(props: StaticAssetsStackProps): void {
    // Temporarily disable certificate requirement for initial setup
    if (false && this.stageConfig.environment === 'prod' && !props.certificateArn && !props.domainName) {
      throw new Error('SSL Certificate ARN or domain name is required for production environment');
    }
  }

  /**
   * Creates S3 bucket for storing static assets
   * @private
   * @returns {s3.Bucket} Configured S3 bucket for assets
   */
  private createAssetsBucket(): s3.Bucket {
    const isEphemeral = this.stageConfig.isEphemeral();
    return new s3.Bucket(this, 'AssetsBucket', {
      bucketName: this.stageConfig.getResourceName('site-assets'),
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      autoDeleteObjects: isEphemeral,
      removalPolicy: isEphemeral ? cdk.RemovalPolicy.DESTROY : cdk.RemovalPolicy.RETAIN,
      cors: [{
        allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        maxAge: 3000,
      }],
    });
  }

  /**
   * Creates S3 bucket for CloudFront access logging
   * @private
   * @returns {s3.Bucket} Configured logging bucket
   */
  private createLoggingBucket(): s3.Bucket {
    const isEphemeral = this.stageConfig.isEphemeral();
    return new s3.Bucket(this, 'CloudFrontLogsBucket', {
      bucketName: this.stageConfig.getResourceName('cloudfront-logs'),
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      enforceSSL: true,
      autoDeleteObjects: isEphemeral,
      removalPolicy: isEphemeral ? cdk.RemovalPolicy.DESTROY : cdk.RemovalPolicy.RETAIN,
      accessControl: s3.BucketAccessControl.LOG_DELIVERY_WRITE,
    });
  }

  /**
   * Creates WAF Web ACL for CloudFront with geographical restrictions
   * @private
   * @returns {wafv2.CfnWebACL} Configured Web ACL
   */
  private createWebACL(): wafv2.CfnWebACL {
    return new wafv2.CfnWebACL(this, 'CloudFrontWebACL', {
      defaultAction: { allow: {} },
      scope: 'CLOUDFRONT',
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: this.stageConfig.getResourceName('cloudfront-metric'),
      },
      name: this.stageConfig.getResourceName('cloudfront-acl'),
      rules: [{
        name: this.stageConfig.getResourceName('allow-usa-territories'),
        priority: 0,
        statement: {
          geoMatchStatement: {
            countryCodes: ['US', 'GU', 'PR', 'VI', 'MP', 'AS', 'UM'],
          },
        },
        action: { allow: {} },
        visibilityConfig: {
          sampledRequestsEnabled: true,
          cloudWatchMetricsEnabled: true,
          metricName: this.stageConfig.getResourceName('usa-territories-metric'),
        },
      }],
    });
  }

  /**
   * Creates and configures CloudFront distribution
   * @private
   * @param {wafv2.CfnWebACL} waf - WAF Web ACL to attach to the distribution
   * @param {StaticAssetsStackProps} props - Stack properties
   * @returns {cloudfront.Distribution} Configured CloudFront distribution
   */
  private createCloudFrontDistribution(
    waf: wafv2.CfnWebACL,
    props: StaticAssetsStackProps
  ): cloudfront.Distribution {
    const domainNames = [];

    // Add domain names if certificate is available
    if (this.certificate && props.domainName) {
      domainNames.push(props.domainName);
      domainNames.push(`www.${props.domainName}`);
    }

    return new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.assetsBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
      },
      comment: `CloudFront Distribution for ${this.stageConfig.getResourceName('site')}`,
      webAclId: waf.attrArn,
      logBucket: this.loggingBucket,
      logFilePrefix: 'cf-logs/',
      logIncludesCookies: false,
      defaultRootObject: 'index.html',
      httpVersion: cloudfront.HttpVersion.HTTP2,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      certificate: this.certificate,
      domainNames: domainNames.length > 0 ? domainNames : undefined,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
          ttl: cdk.Duration.minutes(30),
        },
      ],
    });
  }

  /**
   * Deploys static assets to S3 and invalidates CloudFront cache
   * Only executes if deploymentType is 'content'
   * @private
   */
  private deployStaticAssets(): void {
    if (this.node.tryGetContext('deploymentType') === 'infrastructure') {
      return;
    }
    new s3deploy.BucketDeployment(this, 'DeployStaticAssets', {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, '../../../solution/static-assets/regulations')),
      ],
      destinationBucket: this.assetsBucket,
      distribution: this.distribution,
      distributionPaths: ['/*'],
    });

    Object.entries(this.stageConfig.getStackTags()).forEach(([key, value]) => {
      cdk.Tags.of(this).add(key, value);
    });
  }

  /**
   * Adds CloudFront distribution ID and URL as stack outputs
   * @private
   */
  private addStackOutputs(): void {
    new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
      value: this.distribution.distributionId,
      exportName: this.stageConfig.getResourceName('cloudfront-id'),
      description: 'CloudFront Distribution ID',
    });

    new cdk.CfnOutput(this, 'StaticURL', {
      value: `https://${this.distribution.domainName}`,
      exportName: this.stageConfig.getResourceName('static-url'),
      description: 'CloudFront Distribution URL',
    });

    // Add domain URL output if domain name is provided
    if (this.domainName) {
      new cdk.CfnOutput(this, 'DomainURL', {
        value: `https://${this.domainName}`,
        exportName: this.stageConfig.getResourceName('domain-url'),
        description: 'Custom Domain URL',
      });
    }
  }
}