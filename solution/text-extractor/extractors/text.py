from bs4 import UnicodeDammit

from .extractor import Extractor

# Modified with the help of a LLM to use the markup extractor if it's not really a text file

class TextExtractor(Extractor):
    file_types = ("txt",)

    def _extract(self, file: bytes) -> str:
        # Convert bytes to string with proper encoding detection
        extractor = UnicodeDammit(file)
        text = extractor.unicode_markup

        # Check if the text looks like HTML
        if text.strip().startswith('<') and ('</html>' in text.lower() or '</body>' in text.lower() or '<div' in text.lower()):
            # Use the factory method to get a markup extractor
            try:
                markup_extractor = Extractor.get_extractor("html", self.config)
                return markup_extractor._extract(file)
            except Exception as e:
                # If that fails, proceed with normal text extraction
                import logging
                logger = logging.getLogger(__name__)
                logger.warning(f"Detected HTML content but failed to use markup extractor: {str(e)}. Proceeding with text extraction.")

        # Regular text file, return as is
        return text