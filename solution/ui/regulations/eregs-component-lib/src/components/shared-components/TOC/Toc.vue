<script setup>
import { computed, provide } from "vue";

import TocTitle from "sharedComponents/TOC/TocTitle.vue";
import TocSubchapter from "sharedComponents/TOC/TocSubchapter.vue";

const props = defineProps({
    structure: {
        type: Object,
        required: true,
    },
});

const titleIdentifier = computed(() => props.structure.identifier[0]);

provide("titleIdentifier", titleIdentifier.value);

const titleLabel = computed(() =>
    `${props.structure.label_level} - ${props.structure.label_description}`.replace(
        /&amp;/g,
        "&"
    )
);

const directChildren = computed(() =>
    props.structure.children.filter(
        (child) => child.type === "chapter" || child.type === "subtitle"
    )
);

const titleSubheading = computed(() =>
    directChildren.value.length > 0
        ? `${directChildren.value[0].label_level} - ${directChildren.value[0].label_description}`.replace(
            /&amp;/g,
            "&"
        )
        : undefined
);
</script>

<template>
    <div class="toc__container--inner">
        <TocTitle :title="titleLabel" :subheading="titleSubheading" />
        <TocSubchapter
            v-for="chapter in directChildren"
            :key="chapter.label_level"
        >
            <TocSubchapter
                v-for="subchapter in chapter.children"
                :key="subchapter.label_level"
                :subchapter="subchapter"
            />
        </TocSubchapter>
    </div>
</template>
