from rest_framework import serializers

from common.fields import HeadlineField
from resources.serializers import AbstractResourceSerializer

from .models import Synonym


class SynonymSerializer(serializers.ModelSerializer):
    baseWord = serializers.CharField(source="base_word")
    isActive = serializers.BooleanField(source="is_active")
    synonyms = serializers.SerializerMethodField()

    class Meta:
        model = Synonym
        fields = ("id", "baseWord", "isActive", "synonyms")

    def get_synonyms(self, obj):
        return [
            {
                "id": s.id,
                "baseWord": s.base_word,
                "isActive": s.is_active,
                "synonyms": [
                    {"id": n.id, "baseWord": n.base_word, "isActive": n.is_active}
                    for n in s.synonyms.all()[:20]
                ],
            }
            for s in obj.synonyms.all().order_by("base_word")
        ]


class IndexedRegulationTextSerializer(serializers.Serializer):
    title = serializers.IntegerField()
    date = serializers.CharField()
    part_title = serializers.CharField()
    part_number = serializers.IntegerField()
    node_type = serializers.CharField()
    node_id = serializers.CharField()
    node_title = serializers.CharField()


class ContentSearchSerializer(serializers.Serializer):
    name_headline = HeadlineField()
    summary_headline = HeadlineField()
    content_headline = HeadlineField(blank_when_no_highlight=True)

    resource = AbstractResourceSerializer()
    reg_text = IndexedRegulationTextSerializer()


class SubjectCountSerializer(serializers.Serializer):
    subject = serializers.IntegerField()
    count = serializers.IntegerField()


class CategoryCountSerializer(serializers.Serializer):
    category = serializers.IntegerField()
    parent = serializers.IntegerField()
    count = serializers.IntegerField()


class ContentCountSerializer(serializers.Serializer):
    internal_resource_count = serializers.IntegerField()
    public_resource_count = serializers.IntegerField()
    regulation_text_count = serializers.IntegerField()
    summary = serializers.CharField(required=False, allow_blank=True)

    subjects = SubjectCountSerializer(many=True)
    categories = CategoryCountSerializer(many=True)
