from django.conf import settings
from django.http import HttpRequest
from django.test import TestCase

from cmcs_regulations.context_processors import custom_url


class CustomUrlContextProcessorTest(TestCase):
    def test_custom_url_no_match_request(self):
        # domain the request is being made from
        request = HttpRequest()
        request.META['HTTP_HOST'] = 'policyconnector.digital'

        # custom_url the environment variable is set as.
        settings.CUSTOM_URL = 'policyconnector.digital'

        context = custom_url(request)

        self.assertEqual(context['CUSTOM_URL'], 'policyconnector.digital')

    def test_custom_url_match_request(self):
        request = HttpRequest()
        request.META['HTTP_HOST'] = 'policyconnector.digital'

        settings.CUSTOM_URL = 'policyconnector.digital'

        context = custom_url(request)

        self.assertEqual(context['CUSTOM_URL'], 'policyconnector.digital')
