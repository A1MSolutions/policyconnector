from bs4 import UnicodeDammit

from .extractor import Extractor
from .markup import MarkupExtractor  # Import existing markup extractor

# Modified with the help of a LLM to use the markup extractor if it's not really a text file

class TextExtractor(Extractor):
    file_types = ("txt",)

    def _extract(self, file: bytes) -> str:
        # Convert bytes to string with proper encoding detection
        extractor = UnicodeDammit(file)
        text = extractor.unicode_markup

        # Check if the text looks like HTML
        if text.strip().startswith('<') and ('</html>' in text.lower() or '</body>' in text.lower() or '<div' in text.lower()):
            # This looks like HTML, use the markup extractor instead
            markup_extractor = MarkupExtractor()
            return markup_extractor._extract(file)

        # Regular text file, return as is
        return text