from django.db import connection
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Synonym
from .serializers import SynonymSerializer


def _expand(syn, depth=0, seen=None):
    seen = seen if seen is not None else set()
    if syn.id in seen or depth > 4:
        return []
    seen.add(syn.id)
    out = []
    for rel in syn.synonyms.all():
        out.append(rel)
        if depth < 2:
            out.extend(_expand(rel, depth + 1, seen))
    return out


@extend_schema(
    tags=["content_search"],
    description="Look up synonyms for a search query.",
    responses={200: SynonymSerializer(many=True)},
    parameters=[OpenApiParameter(name="q", type=str, location=OpenApiParameter.QUERY)],
)
class SynonymViewSet(viewsets.ViewSet):
    def list(self, request):
        q = (request.query_params.get("q") or "").strip()
        fuzzy = request.query_params.get("fuzzy") == "true"
        export = request.query_params.get("export") == "true"
        include_inactive = request.query_params.get("include_inactive") == "true"

        if not q:
            if export:
                return Response(SynonymSerializer(Synonym.objects.all(), many=True).data)
            return Response([])

        words = q.split()
        matches = []

        if len(words) == 1:
            word = words[0]
            if fuzzy:
                sql = f"SELECT id FROM content_search_synonym WHERE base_word ILIKE '%{word}%'"
                with connection.cursor() as c:
                    c.execute(sql)
                    ids = [r[0] for r in c.fetchall()]
                matches = list(Synonym.objects.filter(id__in=ids).prefetch_related("synonyms"))
            else:
                matches = list(
                    Synonym.objects.extra(where=[f"base_word ILIKE '%%{word}%%'"]).prefetch_related("synonyms")
                )
        else:
            for word in words:
                if len(word) < 2 or word.lower() in ("a","an","the","of","for","and","or"):
                    continue
                if fuzzy:
                    sql = (
                        f"SELECT id FROM content_search_synonym WHERE lower(base_word)=lower('{word}') "
                        f"OR base_word ILIKE '%{word}%'"
                    )
                    with connection.cursor() as c:
                        c.execute(sql)
                        ids = [r[0] for r in c.fetchall()]
                    found = list(Synonym.objects.filter(id__in=ids).prefetch_related("synonyms"))
                else:
                    exact = Synonym.objects.filter(base_word__iexact=word)
                    if exact.exists():
                        found = list(exact.prefetch_related("synonyms"))
                    else:
                        partial = Synonym.objects.extra(where=[f"base_word ILIKE '%%{word}%%'"])
                        if not include_inactive:
                            partial = partial.filter(is_active=True)
                        found = list(partial.prefetch_related("synonyms"))
                for m in found:
                    if m not in matches:
                        matches.append(m)

        if export:
            expanded, seen = [], set()
            for m in matches:
                for item in [m] + _expand(m):
                    if item.id not in seen:
                        seen.add(item.id)
                        expanded.append(item)
            matches = expanded

        if not include_inactive:
            filtered = [m for m in matches if m.is_active or fuzzy]
            matches = filtered or matches

        return Response(SynonymSerializer(matches, many=True).data)
