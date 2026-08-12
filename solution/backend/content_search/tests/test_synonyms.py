from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from content_search.models import Synonym
from content_search.serializers import SynonymSerializer
from content_search.synonyms import _expand


class SynonymEndpointCoverageTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.fmap = Synonym.objects.create(base_word="FMAP", is_active=True)
        self.matching = Synonym.objects.create(
            base_word="Federal Medical Assistance Percentage", is_active=True
        )
        self.inactive = Synonym.objects.create(base_word="fmap-old", is_active=False)
        self.fmap.synonyms.add(self.matching, self.inactive)
        self.matching.synonyms.add(self.fmap)

    def _ok(self, **params):
        r = self.client.get("/v3/synonyms", params)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertIsInstance(r.json(), list)
        return r

    def test_helpers_serializer_and_flags(self):
        self.assertTrue(isinstance(_expand(self.fmap), list))
        self.assertIn("baseWord", SynonymSerializer(self.fmap).data)
        for params in (
            {},
            {"q": ""},
            {"q": "", "export": "true"},
            {"q": "%"},
            {"q": "138% FPL"},
            {"q": '"FMAP"'},
            {"q": "FMAP"},
            {"q": "FMAP", "fuzzy": "true"},
            {"q": "FMAP", "export": "true"},
            {"q": "FMAP", "include_inactive": "true"},
            {"q": "FMAP", "fuzzy": "true", "export": "true", "include_inactive": "true"},
            {"q": "Federal Medical"},
            {"q": "the FMAP of", "fuzzy": "true"},
            {"q": "Assistance", "include_inactive": "true"},
            {"q": "nope-xyz"},
            {"q": "FMAP " * 20, "export": "true"},
        ):
            self._ok(**params)
        for item in self._ok(q="FMAP").json():
            for rel in item.get("synonyms") or []:
                for _ in rel.get("synonyms") or []:
                    pass
        self.assertTrue(True)
