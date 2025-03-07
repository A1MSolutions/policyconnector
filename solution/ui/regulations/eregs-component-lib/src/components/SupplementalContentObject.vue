<template>
    <div class="supplemental-content">
        <a
            class="supplemental-content-link"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span
                v-if="date"
                class="supplemental-content-date"
                :class="{
                    'supplemental-content-mid-bar': !isBlank(name),
                }"
            >{{ formatDate(date) }}</span>
            <!-- DivisionLabel
                v-if="docType === 'internal_file' && division"
                :division="division"
            /-->
            <span
                v-if="!isBlank(name)"
                class="supplemental-content-title"
                :class="getLinkClasses(docType, description)"
            >{{ name }}</span>
            <div
                v-if="!isBlank(description)"
                class="supplemental-content-description"
                :class="getLinkClasses(docType)"
            >
                <span
                    v-sanitize-html="
                        description +
                            addFileTypeButton({
                                fileName,
                                uid,
                                docType,
                            })
                    "
                />
            </div>
        </a>
        <subject-chips
            v-if="subjects && subjects.length > 0"
            :subjects="subjects"
        />
    </div>
</template>

<script>
import { DOCUMENT_TYPES_MAP, getFileTypeButton } from "utilities/utils";
import SubjectChips from "spaComponents/subjects/SubjectChips.vue";
import { provide } from "vue";

//import DivisionLabel from "./shared-components/results-item-parts/DivisionLabel.vue";

export default {
    name: "SupplementalContentObject",

    components: {
        //DivisionLabel,
        SubjectChips,
    },

    setup() {
        provide("currentRouteName", "regulations"); // Just need to tell it that we're not currently on the subjects page
    },

    props: {
        name: {
            type: String,
            required: false,
            default: undefined,
        },
        description: {
            type: String,
            required: false,
            default: undefined,
        },
        date: {
            type: String,
            required: false,
            default: undefined,
        },
        division: {
            type: Object,
            required: false,
            default: null,
        },
        uid: {
            type: String,
            required: false,
            default: undefined,
        },
        url: {
            type: String,
            default: undefined,
        },
        docType: {
            type: String,
            required: false,
            default: "public_link",
        },
        fileName: {
            type: String,
            required: false,
            default: undefined,
        },
        subjects: {
            type: Array,
            required: false,
            default: () => [],
        },
    },

    methods: {
        isBlank(str) {
            return !str || /^\s*$/.test(str);
        },
        addFileTypeButton({ fileName, uid, docType }) {
            if (DOCUMENT_TYPES_MAP[docType] !== "Internal") {
                return "";
            }

            return getFileTypeButton({
                fileName,
                uid,
            });
        },
        formatDate(value) {
            const date = new Date(value);
            const options = { year: "numeric", timeZone: "UTC" };
            const rawDate = value.split("-");
            if (rawDate.length > 1) {
                options.month = "long";
            }
            if (rawDate.length > 2) {
                options.day = "numeric";
            }
            const format = new Intl.DateTimeFormat("en-US", options);
            return format.format(date);
        },
        getLinkClasses(docType, description) {
            return {
                "supplemental-content-external-link":
                    (DOCUMENT_TYPES_MAP[docType] === "Public" ||
                        docType === "internal_link") &&
                    this.isBlank(description),
            };
        },
    },
};
</script>

<style>
.search-highlight {
    font-weight: bold;
}
</style>
