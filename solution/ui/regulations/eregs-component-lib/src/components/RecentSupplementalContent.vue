<script>
import CategoryLabel from "sharedComponents/results-item-parts/CategoryLabel.vue";
import SupplementalContentObject from "./SupplementalContentObject.vue";
import SubjectChips from "spaComponents/subjects/SubjectChips.vue";
import RelatedSections from "sharedComponents/results-item-parts/RelatedSections.vue";

export default {
    name: "RecentSupplementalContent",

    components: {
        CategoryLabel,
        SubjectChips,
        SupplementalContentObject,
        RelatedSections,
    },

    props: {
        supplementalContent: {
            type: Array,
            required: true,
        },
        limit: {
            type: Number,
            required: false,
            default: 3,
        },
        homeUrl: {
            type: String,
            required: false,
            default: "/",
        },
        partsLastUpdated: {
            type: Object,
            required: true,
        },
    },

    computed: {
        limitedContent() {
            return this.supplementalContent.slice(0, this.limit);
        },
        hasValidRegulations() {
            return (item) => {
                if (!item.cfr_citations || item.cfr_citations.length === 0) {
                    return false;
                }

                return item.cfr_citations.some(citation =>
                    this.partsLastUpdated[citation.part]
                );
            };
        }
    },
};
</script>

<template>
    <div class="supplemental-content-list">
        <template
            v-for="(content, index) in limitedContent"
            :key="content.category.name + index"
        >
            <div class="category-labels">
                <CategoryLabel :name="content.category.name" type="category" />
            </div>
            <SupplementalContentObject
                :name="content.document_id"
                :description="content.title"
                :date="content.date"
                :url="content.url"
            />
            <SubjectChips :subjects="content.subjects" />
            <RelatedSections
                v-if="hasValidRegulations(content)"
                :base="homeUrl"
                :item="content"
                :parts-last-updated="partsLastUpdated"
                label="Related Regulations"
            />
            <div class="spacer" />
        </template>
    </div>
</template>
