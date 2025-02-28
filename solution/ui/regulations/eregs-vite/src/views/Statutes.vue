<script setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { ACT_TYPES } from "eregsComponentLib/src/components/shared-components/Statutes/utils/enums.js";
import { getStatutes, getStatutesActs } from "utilities/api.js";
import { shapeTitlesResponse } from "utilities/utils.js";

import SimpleSpinner from "eregsComponentLib/src/components/SimpleSpinner.vue";
import StatuteSelector from "eregsComponentLib/src/components/shared-components/Statutes/StatuteSelector.vue";
import StatuteTable from "eregsComponentLib/src/components/shared-components/Statutes/StatuteTable.vue";
import TableCaption from "eregsComponentLib/src/components/shared-components/Statutes/TableCaption.vue";

import AccessLink from "@/components/AccessLink.vue";
import Banner from "@/components/Banner.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import HeaderLinks from "@/components/header/HeaderLinks.vue";
import HeaderSearch from "@/components/header/HeaderSearch.vue";
import JumpTo from "@/components/JumpTo.vue";
import HeaderUserWidget from "@/components/header/HeaderUserWidget.vue";

const adminUrl = inject("adminUrl");
const apiUrl = inject("apiUrl");
const customLoginUrl = inject("customLoginUrl");
const homeUrl = inject("homeUrl");
const isAuthenticated = inject("isAuthenticated");
const searchUrl = inject("searchUrl");
const subjectsUrl = inject("subjectsUrl");
const username = inject("username");

// get route query params
const $route = useRoute();

// validate query params to make sure they're in the enum?
const queryParams = ref({
    act: $route?.query?.act ?? "ssa",
    title: $route?.query?.title ?? "19",
});

// Act titles -- state, fetch method, parse method
const acts = ref({
    results: [],
    loading: true,
});

const getActTitles = async () => {
    try {
        const actsArray = await getStatutesActs({
            apiUrl,
        });

        acts.value.results = actsArray;
    } catch (error) {
        console.error(error);
    } finally {
        acts.value.loading = false;
    }
};

const parsedTitles = computed(() =>
    shapeTitlesResponse({
        actsResults: acts.value.results,
        actTypes: ACT_TYPES,
    })
);

// Statutes -- state and fetch method
const statutes = ref({
    results: [],
    loading: true,
});

const getStatutesArray = async () => {
    statutes.value.loading = true;

    try {
        const statutesArray = await getStatutes({
            act: ACT_TYPES[queryParams.value.act],
            apiUrl,
            title: queryParams.value.title,
        });

        statutes.value.results = statutesArray;
    } catch (error) {
        console.error(error);
    } finally {
        statutes.value.loading = false;
    }
};

// watch query params and fetch statutes
watch(
    () => $route.query,
    (newParams) => {
        queryParams.value = {
            act: newParams.act,
            title: newParams.title,
        };
    }
);

watch(
    () => queryParams.value,
    async () => {
        await getStatutesArray();
    }
);

// Watch layout
const windowWidth = ref(window.innerWidth);
const isNarrow = computed(() => windowWidth.value < 1024);

// Watch Banner left margin
const bannerRef = ref(null);
const bannerLeftMargin = ref(0);

const getBannerLeftMargin = () => {
    const bannerContent = bannerRef.value.$el
        .getElementsByClassName("content")
        .item(0);

    bannerLeftMargin.value = window.getComputedStyle(bannerContent).marginLeft;
};

const onWidthChange = () => {
    windowWidth.value = window.innerWidth;
    getBannerLeftMargin();
};

onMounted(() => {
    window.addEventListener("resize", onWidthChange);
    getBannerLeftMargin();
});
onUnmounted(() => window.removeEventListener("resize", onWidthChange));

// On load
getActTitles();
getStatutesArray();
</script>

<template>
    <body class="ds-base statute-page">
        <header id="header" class="sticky">
            <HeaderComponent :home-url="homeUrl">
                <template #jump-to>
                    <JumpTo :api-url="apiUrl" :home-url="homeUrl" />
                </template>
                <template #links>
                    <HeaderLinks :subjects-url="subjectsUrl" />
                </template>
                <template #search>
                    <HeaderSearch :search-url="searchUrl" />
                </template>
                <template v-if="isAuthenticated" #sign-in>
                    <HeaderUserWidget :admin-url="adminUrl">
                        <template #username>
                            {{ username }}
                        </template>
                    </HeaderUserWidget>
                </template>
                <template #get-access>
                    <AccessLink v-if="!isAuthenticated" :base="homeUrl" />
                </template>
            </HeaderComponent>
        </header>
        <div id="statuteApp" class="statute-view">
            <Banner ref="bannerRef" title="Statute Reference">
                <template #description>
                    <p>Provided for convenience, this is a table of contents for <a href="https://uscode.house.gov/browse/prelim@title5&edition=prelim">5 U.S.C.</a> Part III, with links to the <a href="https://uscode.house.gov/">House U.S. Code website</a>.</p>
                </template>
            </Banner>
            <div id="main-content" class="statute__container">
                <div class="content" :style="{ marginLeft: bannerLeftMargin }">
                    <div>









                    </div>
                </div>
            </div>
        </div>
    </body>
</template>
