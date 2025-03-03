import warnings
from bs4 import BeautifulSoup, XMLParsedAsHTMLWarning
from .extractor import Extractor

class MarkupExtractor(Extractor):
    # Modified by LLM to handle a bunch of special cases
    # Expanded file types to include ASP and other common web formats
    file_types = ("html", "xml", "javascript", "js", "asp", "aspx", "php")
    
    def _extract(self, file: bytes) -> str:
        # Convert bytes to string for initial inspection
        try:
            content_str = file.decode('utf-8', errors='replace')
        except:
            content_str = str(file)
        
        # Check if this is likely HTML content regardless of file extension
        if ("<html" in content_str.lower() or 
            "<body" in content_str.lower() or 
            "<!doctype html" in content_str.lower() or
            "<div" in content_str.lower()):  # Added <div> check for partial HTML
            
            # This is likely HTML content, proceed with HTML parsing
            warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)
            extractor = BeautifulSoup(file, "html.parser")
            warnings.resetwarnings()
            
            # Remove script and style tags regardless of approach
            for i in extractor(["script", "style"]):
                i.decompose()
            
            # For this specific type of page (OSC.gov SharePoint pages)
            content_area = extractor.find("div", id="DeltaPlaceHolderMain")
            if content_area:
                # Find the article content within the main content area
                article_content = content_area.find("div", class_="ms-rtestate-field")
                if article_content:
                    return article_content.get_text(" ")
                return content_area.get_text(" ")
            
            # Other targeted extraction approaches
            main_content_div = extractor.find("div", id="main-main-content")
            if main_content_div:
                content_section = main_content_div.find("section", class_="body-content")
                if content_section:
                    return content_section.get_text(" ")
                return main_content_div.get_text(" ")
                
            # Try specific content containers common in content management systems
            for content_id in ["contentBox", "pageTitle", "content", "main-content", 
                              "article", "post", "entry-content", "contentContainer"]:
                content_div = extractor.find(id=content_id) or extractor.find(class_=content_id)
                if content_div:
                    return content_div.get_text(" ")
            
            # Try semantic HTML tags
            main_tag = extractor.find("main")
            if main_tag:
                # Try to find and remove navigation elements within main
                nav_elements = main_tag.find_all(["nav", "div"], 
                                                class_=["SideNavContainer", "usa-sidenav", "navigation", "sidebar"])
                for nav in nav_elements:
                    nav.decompose()
                return main_tag.get_text(" ")
            
            article_tag = extractor.find("article")
            if article_tag:
                return article_tag.get_text(" ")
            
            # Fallback: extract from the entire body but try to exclude navigation
            body = extractor.find("body")
            if body:
                # Try to remove common navigation elements
                for nav in body.find_all(["header", "nav", "footer", "aside"], 
                                        class_=["usa-nav", "usa-footer", "SideNavContainer", 
                                              "navigation", "menu", "sidebar"]):
                    nav.decompose()
                return body.get_text(" ")
            
            # Final fallback: use the entire document
            return extractor.get_text(" ")
            
        else:
            # This is not HTML-like content, return cleaned version
            cleaned_content = []
            in_comment_block = False
            
            for line in content_str.split('\n'):
                # Skip multi-line comment blocks
                if '/*' in line:
                    in_comment_block = True
                if '*/' in line:
                    in_comment_block = False
                    continue
                if in_comment_block:
                    continue
                    
                # Skip single-line comments
                if '//' in line:
                    line = line.split('//', 1)[0]
                
                # Add non-empty lines
                if line.strip():
                    cleaned_content.append(line)
            
            return " ".join(cleaned_content)