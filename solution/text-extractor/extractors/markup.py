import warnings
import re
from bs4 import BeautifulSoup, XMLParsedAsHTMLWarning
from .extractor import Extractor

# Modified by LLM to handle a bunch of special cases

class MarkupExtractor(Extractor):
    # Expanded file types to include ASP and other common web formats
    file_types = ("html", "xml", "javascript", "js", "asp", "aspx", "php")
    
    def _extract(self, file: bytes) -> str:
        # Convert bytes to string for initial inspection
        try:
            content_str = file.decode('utf-8', errors='replace')
        except Exception as e:
            content_str = str(file)
        
        # Check if this is likely HTML content regardless of file extension
        if ("<html" in content_str.lower() or 
            "<body" in content_str.lower() or 
            "<!doctype html" in content_str.lower() or
            "<div" in content_str.lower()):  # Added <div> check for partial HTML
            
            # This is likely HTML content, proceed with HTML parsing
            warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)
            extractor = BeautifulSoup(file, "html.parser")  # Use html.parser to avoid lxml dependency (has M1 issues)
            warnings.resetwarnings()
            
            # Remove <script> and <style> inline tags
            for i in extractor(["script", "style"]):
                i.decompose()
            
            # Primary content extraction strategy - common patterns across gov sites
            
            # 1. Try to find main content container by ID
            for main_id in ["main-main-content", "DeltaPlaceHolderMain", "mainContent", "main-content"]:
                main_content = extractor.find(id=main_id)
                if main_content:
                    # If it contains a "body-content" section, use that
                    body_content = main_content.find(class_="body-content") or main_content.find(class_="ms-rtestate-field")
                    if body_content:
                        return self._clean_extracted_text(body_content.get_text(" "))
                    return self._clean_extracted_text(main_content.get_text(" "))
            
            # 2. Try to find by semantic HTML5 tags
            main_tag = extractor.find("main")
            if main_tag:
                # Remove navigation elements within main
                for nav in main_tag.find_all(["nav"], recursive=True):
                    nav.decompose()
                for side_nav in main_tag.find_all(class_=["SideNavContainer", "usa-sidenav", "navigation", "sidebar"]):
                    side_nav.decompose()
                # Remove breadcrumbs
                for breadcrumb in main_tag.find_all(class_=lambda c: c and "breadcrumb" in str(c).lower()):
                    breadcrumb.decompose()
                return self._clean_extracted_text(main_tag.get_text(" "))
            
            article_tag = extractor.find("article")
            if article_tag:
                return self._clean_extracted_text(article_tag.get_text(" "))
            
            # 3. Try common content container classes
            for content_class in ["body-content", "entry-content", "ContentPlaceHolder", "contentBox", "contentContainer", "main-content", "content", "region-content", "ms-rtestate-field"]:
                content_div = extractor.find(class_=lambda c: c and content_class in str(c).lower())
                if content_div:
                    return self._clean_extracted_text(content_div.get_text(" "))
            
            # Special handling for documents with <pre> tags (like Federal Register)
            pre_tags = extractor.find_all("pre")
            if pre_tags:
                pre_text = " ".join(pre.get_text(" ") for pre in pre_tags)
                if pre_text.strip():
                    return self._clean_extracted_text(pre_text)
            
            # 4. Fallback to body tag with navigation removed
            body = extractor.find("body")
            if body:
                # Remove common navigation elements
                for element_type in ["header", "nav", "footer", "aside"]:
                    for element in body.find_all(element_type):
                        element.decompose()
                
                # Remove common navigation classes
                for class_name in ["usa-nav", "usa-footer", "usa-header", "SideNavContainer", "navigation", "menu", "sidebar"]:
                    for element in body.find_all(class_=lambda c: c and class_name in str(c).lower()):
                        element.decompose()
                
                return self._clean_extracted_text(body.get_text(" "))
            
            # 5. Final fallback - use the entire document
            extracted_text = extractor.get_text(" ")
            if extracted_text.strip():
                return self._clean_extracted_text(extracted_text)
            
            # Last resort - try to extract paragraphs if we still have no content
            paragraphs = extractor.find_all("p")
            if paragraphs:
                return self._clean_extracted_text(" ".join(p.get_text(" ") for p in paragraphs))
            
            return self._clean_extracted_text(content_str)
            
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
            
            return self._clean_extracted_text(" ".join(cleaned_content))
    
    def _clean_extracted_text(self, text: str) -> str:
        """Clean up the extracted text to remove header/footer patterns and repeated symbols."""
        # Replace consecutive === or ___ patterns (common in Federal Register)
        text = re.sub(r'={3,}', ' ', text)
        text = re.sub(r'_{3,}', ' ', text)

        # Clean up extra whitespace from all the replacements
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text