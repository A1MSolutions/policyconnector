import json
import sys
import re
import boto3
from django.conf import settings


class SummarizationService:
    def __init__(self):
        # Use default credential chain (includes AWS Toolkit)
        # Explicitly use default session to avoid profile issues
        session = boto3.Session()
        self.client = session.client(
            'bedrock-runtime',
            region_name=settings.AWS_REGION
        )

    def summarize(self, headlines, query):
        try:

            # Test AWS credentials first
            import boto3
            sts = boto3.client('sts')
            try:
                identity = sts.get_caller_identity()
            except Exception as e:
                print(f"DEBUG: AWS credentials test failed: {str(e)}", file=sys.stderr, flush=True)
                return None

            # Clean headlines by removing HTML tags
            cleaned_headlines = []
            for headline in headlines:
                if headline:
                    # Remove HTML tags like <span class='search-highlight'> and </span>
                    cleaned = re.sub(r'<[^>]+>', '', headline)
                    # Clean up extra whitespace
                    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
                    if cleaned:
                        cleaned_headlines.append(cleaned)

            # Simple concatenation of all cleaned headlines
            headline_text = " ".join(cleaned_headlines)
            prompt = f"You are a government policy expert speaking to a policy expert audience. Concisely summarize the following search results, in fewer than 100 words, in one paragraph with key details, focusing on information most relevant to all words in the query term: '{query}'. Don't say you are summarizing the search results. These are the search results: '{headline_text}'"

            response = self.client.invoke_model(
                modelId='amazon.titan-text-premier-v1:0',
                body=json.dumps({'inputText': prompt})
            )

            result = json.loads(response['body'].read())
            summary = result['results'][0]['outputText']

            # Cut off any text after the last period to ensure ending on a complete sentence
            last_period = summary.rfind('.')
            if last_period != -1:
                summary = summary[:last_period + 1]
            # If no period, return as-is
            return summary

        except Exception as e:
            print(f"DEBUG: Summarization failed with error: {str(e)}", file=sys.stderr, flush=True)
            # Return None if summarization fails
            return None
