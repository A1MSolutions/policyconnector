import json
import traceback

from django.http.response import HttpResponse, HttpResponsePermanentRedirect

from regulations.models import SiteConfiguration


class WwwRedirectMiddleware:
    """
    Middleware to redirect www.policyconnector.digital to policyconnector.digital
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host()
        
        # If request is specifically for www.policyconnector.digital, redirect to root domain
        if host == 'www.policyconnector.digital':
            new_url = f"{request.scheme}://policyconnector.digital{request.get_full_path()}"
            return HttpResponsePermanentRedirect(new_url)
        
        return self.get_response(request)


class ProcessResponse:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        config = SiteConfiguration.objects.first()
        response = self.get_response(request)

        # Add Strict-Transport-Security header if HTTPS
        if request.is_secure() and not response.get("Strict-Transport-Security"):
            response["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"

        # Add X-Robots-Tag header based on configuration
        if not config.allow_indexing:
            response["X-Robots-Tag"] = "noindex"

        return response


class JsonErrors:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_exception(self, request, exception):
        if "json_errors" in request.GET:
            error = {
                "status": "error",
                "type": str(type(exception)),
                "exception": str(exception),
                "traceback": traceback.extract_tb(exception.__traceback__).format(),
            }

            return HttpResponse(json.dumps(error), content_type="application/json", status=500)
        else:
            return None
