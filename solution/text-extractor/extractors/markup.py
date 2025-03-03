import warnings
from bs4 import BeautifulSoup, XMLParsedAsHTMLWarning
from .extractor import Extractor

class MarkupExtractor(Extractor):
    file_types = ("html", "xml")
    
    def _extract(self, file: bytes) -> str:
        warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)  # Hide unnecessary warning about parsing XML
        
        # Parse HTML content
        soup = BeautifulSoup(file, "html.parser")  # Use html.parser to avoid lxml dependency (has M1 issues)
        warnings.resetwarnings()
        
        # Remove script and style tags regardless of approach
        for i in soup(["script", "style"]):
            i.decompose()  # Remove <script> and <style> inline tags
        
        # Target strategy:
        # 1. First, try to find the main content div which contains the actual article content
        main_content_div = soup.find("div", id="main-main-content")
        
        if main_content_div:
            # Further refine by finding the actual content section within main-main-content
            content_section = main_content_div.find("section", class_="body-content")
            if content_section:
                # If we found the specific content section, use that
                return content_section.get_text(" ")
            else:
                # If specific content section not found, use the main content div
                return main_content_div.get_text(" ")
        
        # 2. If main-main-content not found, try <main> tag
        main_tag = soup.find("main")
        if main_tag:
            # Try to find and remove navigation elements within main
            nav_elements = main_tag.find_all(["nav", "div"], class_=["SideNavContainer", "usa-sidenav"])
            for nav in nav_elements:
                nav.decompose()
                
            return main_tag.get_text(" ")
        
        # 3. Fallback: if none of the above works, extract text from the entire body but try to exclude navigation
        body = soup.find("body")
        if body:
            # Try to remove common navigation elements
            for nav in body.find_all(["header", "nav", "footer", "div"], class_=["usa-nav", "usa-footer", "SideNavContainer"]):
                nav.decompose()
            
            return body.get_text(" ")
        
        # 4. Final fallback: use the entire document
        return soup.get_text(" ")