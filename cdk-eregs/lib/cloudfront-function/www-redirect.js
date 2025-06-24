function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    
    // Check if the request is for www subdomain
    if (host.startsWith('www.')) {
        // Extract the apex domain (remove www.)
        var apexDomain = host.substring(4);
        
        // Create redirect response
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                'location': { value: 'https://' + apexDomain + request.uri + (request.querystring ? '?' + request.querystring : '') }
            }
        };
        
        return response;
    }
    
    // Return the original request if not www subdomain
    return request;
}