#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/stacks/vpc-stack';
import { BackendStack } from '../lib/stacks/api-stack';
import { StaticAssetsStack } from '../lib/stacks/static-assets-stack';
import { StageConfig } from '../config/stage-config';
import { getParameterValue } from '../utils/parameter-store';

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

async function main() {
  // Create StageConfig for prod
  const stageConfig = await StageConfig.create(
    'prod',
    undefined,
    'arn:aws:iam::aws:policy/PowerUserAccess'
  );

  // Get infrastructure parameters
  const [vpcId, subnet1a, subnet1b] = await Promise.all([
    getParameterValue('/account_vars/vpc/prod/id'),
    getParameterValue('/account_vars/vpc/prod/subnets/private/1a/id'),
    getParameterValue('/account_vars/vpc/prod/subnets/private/1b/id'),
  ]);

  // Only create the VPC stack if we're deploying it
  const stackName = process.argv[3];
  if (!stackName || stackName === 'a1m-eregs-prod-vpc') {
    new VpcStack(app, 'a1m-eregs-prod-vpc', { env });
  }

  if (!stackName || stackName === 'a1m-eregs-prod-static') {
    // Get deployment type from context or default to 'content'
    const deploymentType = app.node.tryGetContext('deploymentType') || 'content';

    new StaticAssetsStack(app, 'a1m-eregs-prod-static', {
      env,
      deploymentType,
      certificateArn: process.env.CERTIFICATE_ARN,
    }, stageConfig);
  }

  // Only create the API stack if we're deploying it
  if (!stackName || stackName === 'a1m-eregs-prod-api') {
    new BackendStack(app, 'a1m-eregs-prod-api', {
      env,
      environmentConfig: {
        vpcId,
        logLevel: 'INFO',
        subnetIds: [subnet1a, subnet1b]
      },
      lambdaConfig: {
        memorySize: 1024,
        timeout: 30
      }
    }, stageConfig);
  }

  app.synth();
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
