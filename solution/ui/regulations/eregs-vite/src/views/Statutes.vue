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


<h2>Title 5 — Government Organization and Employees</h2>

<h3>Part III — Employees</h3>

<h4>Subpart A — General Provisions</h4>

<h5>Chapter 21 — Definitions</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2101&num=0&edition=prelim">2101. Civil service; armed forces; uniformed services</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2101a&num=0&edition=prelim">2101a. The Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2102&num=0&edition=prelim">2102. The competitive service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2103&num=0&edition=prelim">2103. The excepted service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2104&num=0&edition=prelim">2104. Officer</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2105&num=0&edition=prelim">2105. Employee</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2106&num=0&edition=prelim">2106. Member of Congress</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2107&num=0&edition=prelim">2107. Congressional employee</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2108&num=0&edition=prelim">2108. Veteran; disabled veteran; preference eligible</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2108a&num=0&edition=prelim">2108a. Treatment of certain individuals as veterans, disabled veterans, and preference eligibles</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2109&num=0&edition=prelim">2109. Air traffic controller; Secretary</a></li>
</ul>

<h5>Chapter 23 — Merit System Principles</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2301&num=0&edition=prelim">2301. Merit system principles</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2302&num=0&edition=prelim">2302. Prohibited personnel practices</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2303&num=0&edition=prelim">2303. Prohibited personnel practices in the Federal Bureau of Investigation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2304&num=0&edition=prelim">2304. Prohibited personnel practices affecting the Transportation Security Administration</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2305&num=0&edition=prelim">2305. Responsibility of the Government Accountability Office</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2306&num=0&edition=prelim">2306. Coordination with certain other provisions of law</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2307&num=0&edition=prelim">2307. [Repealed]</a></li>
</ul>

<h5>Chapter 29 — Commissions, Oaths, Records, and Reports</h5>
<h6>Subchapter I — Commissions, Oaths, and Records</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2901&num=0&edition=prelim">2901. Commission of an officer</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2902&num=0&edition=prelim">2902. Commission; where recorded</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2903&num=0&edition=prelim">2903. Oath; authority to administer</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2904&num=0&edition=prelim">2904. Oath; administered without fees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2905&num=0&edition=prelim">2905. Oath; renewal</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2906&num=0&edition=prelim">2906. Oath; custody</a></li>
</ul>

<h6>Subchapter II — Reports</h6>

 
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2951&num=0&edition=prelim">2951. Reports to the Office of Personnel Management</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2952&num=0&edition=prelim">2952. Time of making annual reports</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2953&num=0&edition=prelim">2953. Reports to Congress on additional employee requirements</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2954&num=0&edition=prelim">2954. Information to committees of Congress on request</a></li>
</ul>

<h4>Subpart B — Employment and Retention</h4>
<h5>Chapter 31 — Authority for Employment</h5>
<h6>Subchapter I — Employment Authorities</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3101&num=0&edition=prelim">3101. General authority to employ</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3102&num=0&edition=prelim">3102. Employment of personal assistants for handicapped employees, including blind and deaf employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3103&num=0&edition=prelim">3103. Employment at seat of Government only for services rendered</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3104&num=0&edition=prelim">3104. Employment of specially qualified scientific and professional personnel</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3105&num=0&edition=prelim">3105. Appointment of administrative law judges</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3106&num=0&edition=prelim">3106. Employment of attorneys; restrictions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3107&num=0&edition=prelim">3107. Employment of publicity experts; restrictions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3108&num=0&edition=prelim">3108. Employment of detective agencies; restrictions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3109&num=0&edition=prelim">3109. Employment of experts and consultants; temporary or intermittent</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3110&num=0&edition=prelim">3110. Employment of relatives; restrictions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3111&num=0&edition=prelim">3111. Acceptance of volunteer service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3111a&num=0&edition=prelim">3111a. Federal internship programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3112&num=0&edition=prelim">3112. Disabled veterans; noncompetitive appointment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3113&num=0&edition=prelim">3113. Restriction on reemployment after conviction of certain crimes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3114&num=0&edition=prelim">3114. Appointment of candidates to positions in the competitive service by the Securities and Exchange Commission</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3115&num=0&edition=prelim">3115. Expedited hiring authority for college graduates; competitive service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3116&num=0&edition=prelim">3116. Expedited hiring authority for post-secondary students; competitive service</a></li>
</ul>

<h6>Subchapter II — The Senior Executive Service</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3131&num=0&edition=prelim">3131. The Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3132&num=0&edition=prelim">3132. Definitions and exclusions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3133&num=0&edition=prelim">3133. Authorization of positions; authority for appointment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3134&num=0&edition=prelim">3134. Limitations on noncareer and limited appointments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3135&num=0&edition=prelim">3135. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3136&num=0&edition=prelim">3136. Regulations</a></li>
</ul>

<h6>Subchapter III — The Federal Bureau of Investigation and Drug Enforcement Administration Senior Executive Service</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3151&num=0&edition=prelim">3151. The Federal Bureau of Investigation and Drug Enforcement Administration Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3152&num=0&edition=prelim">3152. Limitation on pay</a></li>
</ul>

<h6>Subchapter IV — Temporary Organizations Established by Law or Executive Order</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3161&num=0&edition=prelim">3161. Employment and compensation of employees</a></li>
</ul>

<h6>Subchapter V — Presidential Innovation Fellows Program</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3171&num=0&edition=prelim">3171. Presidential Innovation Fellows Program</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3172&num=0&edition=prelim">3172. Presidential Innovation Fellows Program Advisory Board</a></li>
</ul>

<h5>Chapter 33 — Examination, Selection, and Placement</h5>
<h6>Subchapter I — Examination, Certification, and Appointment</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3301&num=0&edition=prelim">3301. Civil service; generally</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3302&num=0&edition=prelim">3302. Competitive service; rules</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3303&num=0&edition=prelim">3303. Competitive service; recommendations of Senators or Representatives</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3304&num=0&edition=prelim">3304. Competitive service; examinations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3304a&num=0&edition=prelim">3304a. Competitive service; career appointment after 3 years' temporary service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3305&num=0&edition=prelim">3305. Competitive service; examinations; when held</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3306&num=0&edition=prelim">3306. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3307&num=0&edition=prelim">3307. Competitive service; maximum-age entrance requirements; exceptions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3308&num=0&edition=prelim">3308. Competitive service; examinations; educational requirements prohibited; exceptions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3309&num=0&edition=prelim">3309. Preference eligibles; examinations; additional points for</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3310&num=0&edition=prelim">3310. Preference eligibles; examinations; guards, elevator operators, messengers, and custodians</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3311&num=0&edition=prelim">3311. Preference eligibles; examinations; crediting experience</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3312&num=0&edition=prelim">3312. Preference eligibles; physical qualifications; waiver</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3313&num=0&edition=prelim">3313. Competitive service; registers of eligibles</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3314&num=0&edition=prelim">3314. Registers; preference eligibles who resigned</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3315&num=0&edition=prelim">3315. Registers; preference eligibles furloughed or separated</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3315a&num=0&edition=prelim">3315a. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3316&num=0&edition=prelim">3316. Preference eligibles; reinstatement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3317&num=0&edition=prelim">3317. Competitive service; certification from registers</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3318&num=0&edition=prelim">3318. Competitive service; selection from certificates</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3319&num=0&edition=prelim">3319. Alternative ranking and selection procedures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3320&num=0&edition=prelim">3320. Excepted service; government of the District of Columbia; selection</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3321&num=0&edition=prelim">3321. Competitive service; probationary period</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3322&num=0&edition=prelim">3322. Voluntary separation before resolution of personnel investigation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3323&num=0&edition=prelim">3323. Automatic separations; reappointment; reemployment of annuitants</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3324&num=0&edition=prelim">3324. Appointments to positions classified above GS–15</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3325&num=0&edition=prelim">3325. Appointments to scientific and professional positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3326&num=0&edition=prelim">3326. Appointments of retired members of the armed forces to positions in the Department of Defense</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3327&num=0&edition=prelim">3327. Civil service employment information</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3328&num=0&edition=prelim">3328. Selective Service registration</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3329&num=0&edition=prelim">3329. Appointments of military reserve technicians to positions in the competitive service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3330&num=0&edition=prelim">3330. Government-wide list of vacant positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3330a&num=0&edition=prelim">3330a. Preference eligibles; administrative redress</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3330b&num=0&edition=prelim">3330b. Preference eligibles; judicial redress</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3330c&num=0&edition=prelim">3330c. Preference eligibles; remedy</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3330d&num=0&edition=prelim">3330d. Appointment of military and Department of Defense civilian spouses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3330e&num=0&edition=prelim">3330e. Review of official personnel file of former Federal employees before rehiring</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3330f&num=0&edition=prelim">3330f. Government policy and supporting position data</a></li>
</ul>

<h6>Subchapter II — Oath of Office</h6>
 <ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3331&num=0&edition=prelim">3331. Oath of office</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3332&num=0&edition=prelim">3332. Officer affidavit; no consideration paid for appointment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3333&num=0&edition=prelim">3333. Employee affidavit; loyalty and striking against the Government</a></li>
 </ul> 

<h6>Subchapter III — Details, Vacancies, and Appointments</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3341&num=0&edition=prelim">3341. Details; within Executive or military departments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3342&num=0&edition=prelim">3342. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3343&num=0&edition=prelim">3343. Details; to international organizations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3344&num=0&edition=prelim">3344. Details; administrative law judges</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3345&num=0&edition=prelim">3345. Acting officer</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3346&num=0&edition=prelim">3346. Time limitation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3347&num=0&edition=prelim">3347. Exclusivity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3348&num=0&edition=prelim">3348. Vacant office</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3349&num=0&edition=prelim">3349. Reporting of vacancies</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3349a&num=0&edition=prelim">3349a. Presidential inaugural transitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3349b&num=0&edition=prelim">3349b. Holdover provisions relating to certain independent establishments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3349c&num=0&edition=prelim">3349c. Exclusion of certain officers</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3349d&num=0&edition=prelim">3349d. Notification of intent to nominate during certain recesses or adjournments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3349e&num=0&edition=prelim">3349e. Presidential explanation of failure to nominate an Inspector General</a></li>
</ul>

<h6>Subchapter IV — Transfers</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3351&num=0&edition=prelim">3351. Preference eligibles; transfer; physical qualifications; waiver</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3352&num=0&edition=prelim">3352. Preference in transfers for employees making certain disclosures</a></li>
</ul>

<h6>Subchapter V — Promotion</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3361&num=0&edition=prelim">3361. Promotion; competitive service; examination</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3362&num=0&edition=prelim">3362. Promotion; effect of incentive award</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3363&num=0&edition=prelim">3363. Preference eligibles; promotion; physical qualifications; waiver</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3364&num=0&edition=prelim">3364. [Repealed]</a></li>
</ul>

<h6>Subchapter VI — Assignments to and From States</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3371&num=0&edition=prelim">3371. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3372&num=0&edition=prelim">3372. General provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3373&num=0&edition=prelim">3373. Assignments of employees to State or local governments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3374&num=0&edition=prelim">3374. Assignments of employees from State or local governments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3375&num=0&edition=prelim">3375. Travel expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3376&num=0&edition=prelim">3376. Regulations</a></li>
</ul>

<h6>Subchapter VII — Air Traffic Controllers</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3381&num=0&edition=prelim">3381. Training</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3382&num=0&edition=prelim">3382. Involuntary separation for retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3383&num=0&edition=prelim">3383. Determinations; review procedures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3384&num=0&edition=prelim">3384. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3385&num=0&edition=prelim">3385. Effect on other authority</a></li>
</ul>

<h6>Subchapter VIII — Appointment, Reassignment, Transfer, and Development in the Senior Executive Service</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3391&num=0&edition=prelim">3391. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3392&num=0&edition=prelim">3392. General appointment provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3393&num=0&edition=prelim">3393. Career appointments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3393a&num=0&edition=prelim">3393a. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3394&num=0&edition=prelim">3394. Noncareer and limited appointments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3395&num=0&edition=prelim">3395. Reassignment and transfer within the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3396&num=0&edition=prelim">3396. Development for and within the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3397&num=0&edition=prelim">3397. Regulations</a></li>
</ul>

<h5>Chapter 34 — Part-Time Career Employment Opportunities</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3401&num=0&edition=prelim">3401. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3402&num=0&edition=prelim">3402. Establishment of part-time career employment programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3403&num=0&edition=prelim">3403. Limitations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3404&num=0&edition=prelim">3404. Personnel ceilings</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3405&num=0&edition=prelim">3405. Nonapplicability</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3406&num=0&edition=prelim">3406. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3407&num=0&edition=prelim">3407. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3408&num=0&edition=prelim">3408. Employee organization representation</a></li>
</ul>

<h5>Chapter 35 — Retention Preference, Voluntary Separation Incentive Payments, Restoration, and Reemployment</h5>
<h6>Subchapter I — Retention Preference</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3501&num=0&edition=prelim">3501. Definitions; application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3502&num=0&edition=prelim">3502. Order of retention</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3503&num=0&edition=prelim">3503. Transfer of functions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3504&num=0&edition=prelim">3504. Preference eligibles; retention; physical qualifications; waiver</a></li>
</ul>

<h6>Subchapter II — Voluntary Separation Incentive Payments</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3521&num=0&edition=prelim">3521. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3522&num=0&edition=prelim">3522. Agency plans; approval</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3523&num=0&edition=prelim">3523. Authority to provide voluntary separation incentive payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3524&num=0&edition=prelim">3524. Effect of subsequent employment with the Government</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3525&num=0&edition=prelim">3525. Regulations</a></li>
</ul>

<h6>Subchapter III — Reinstatement or Restoration After Suspension or Removal for National Security</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3571&num=0&edition=prelim">3571. Reinstatement or restoration; individuals suspended or removed for national security</a></li>
</ul>

<h6>Subchapter IV — Reemployment After Service With an International Organization</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3581&num=0&edition=prelim">3581. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3582&num=0&edition=prelim">3582. Rights of transferring employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3583&num=0&edition=prelim">3583. Computations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3584&num=0&edition=prelim">3584. Regulations</a></li>
</ul>

<h6>Subchapter V — Removal, Reinstatement, and Guaranteed Placement in the Senior Executive Service</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3591&num=0&edition=prelim">3591. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3592&num=0&edition=prelim">3592. Removal from the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3593&num=0&edition=prelim">3593. Reinstatement in the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3594&num=0&edition=prelim">3594. Guaranteed placement in other personnel systems</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3595&num=0&edition=prelim">3595. Reduction in force in the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3595a&num=0&edition=prelim">3595a. Furlough in the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3596&num=0&edition=prelim">3596. Regulations</a></li>
</ul>

<h6>Subchapter VI — Reemployment Following Limited Appointment in the Foreign Service</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3597&num=0&edition=prelim">3597. Reemployment following limited appointment in the Foreign Service</a></li>
</ul>

<h6>Subchapter VII — Retention of Retired Specialized Employees at the Federal Bureau of Investigation</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3598&num=0&edition=prelim">3598. Federal Bureau of Investigation reserve service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3598-1&num=0&edition=prelim">3598. Federal Bureau of Investigation Reserve Service</a></li>
</ul>

<h5>Chapter 37 — Information Technology Exchange Program</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3701&num=0&edition=prelim">3701. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3702&num=0&edition=prelim">3702. General provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3703&num=0&edition=prelim">3703. Assignment of employees to private sector organizations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3704&num=0&edition=prelim">3704. Assignment of employees from private sector organizations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3705&num=0&edition=prelim">3705. Application to Office of the Chief Technology Officer of the District of Columbia</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3706&num=0&edition=prelim">3706. Reporting requirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section3707&num=0&edition=prelim">3707. Regulations</a></li>
</ul>

<h4>Subpart C — Employee Performance</h4>
<h5>Chapter 41 — Training</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4101&num=0&edition=prelim">4101. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4102&num=0&edition=prelim">4102. Exceptions; Presidential authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4103&num=0&edition=prelim">4103. Establishment of training programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4104&num=0&edition=prelim">4104. Government facilities; use of</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4105&num=0&edition=prelim">4105. Non-Government facilities; use of</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4106&num=0&edition=prelim">4106. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4107&num=0&edition=prelim">4107. Academic degree training</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4108&num=0&edition=prelim">4108. Employee agreements; service after training</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4109&num=0&edition=prelim">4109. Expenses of training</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4110&num=0&edition=prelim">4110. Expenses of attendance at meetings</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4111&num=0&edition=prelim">4111. Acceptance of contributions, awards, and other payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4112&num=0&edition=prelim">4112. Absorption of costs within funds available</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4113&num=0&edition=prelim">4113. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4114&num=0&edition=prelim">4114. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4115&num=0&edition=prelim">4115. Collection of training information</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4116&num=0&edition=prelim">4116. Training program assistance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4117&num=0&edition=prelim">4117. Administration</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4118&num=0&edition=prelim">4118. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4119&num=0&edition=prelim">4119. Training for employees under the Office of the Architect of the Capitol and the Botanic Garden</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4120&num=0&edition=prelim">4120. Training for employees of the Capitol Police</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4121&num=0&edition=prelim">4121. Specific training programs</a></li>
</ul>

<h5>Chapter 43 — Performance Appraisal</h5>
<h6>Subchapter I — General Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4301&num=0&edition=prelim">4301. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4302&num=0&edition=prelim">4302. Establishment of performance appraisal systems</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4302a&num=0&edition=prelim">4302a. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4303&num=0&edition=prelim">4303. Actions based on unacceptable performance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4304&num=0&edition=prelim">4304. Responsibilities of Office of Personnel Management</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4305&num=0&edition=prelim">4305. Regulations</a></li>
</ul>

<h6>Subchapter II — Performance Appraisal in the Senior Executive Service</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4311&num=0&edition=prelim">4311. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4312&num=0&edition=prelim">4312. Senior Executive Service performance appraisal systems</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4313&num=0&edition=prelim">4313. Criteria for performance appraisals</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4314&num=0&edition=prelim">4314. Ratings for performance appraisals</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4315&num=0&edition=prelim">4315. Regulations</a></li>
</ul>

<h5>Chapter 45 — Incentive Awards</h5>
<h6>Subchapter I — Awards for Superior Accomplishments</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4501&num=0&edition=prelim">4501. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4502&num=0&edition=prelim">4502. General provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4503&num=0&edition=prelim">4503. Agency awards</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4504&num=0&edition=prelim">4504. Presidential awards</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4505&num=0&edition=prelim">4505. Awards to former employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4505a&num=0&edition=prelim">4505a. Performance-based cash awards</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4506&num=0&edition=prelim">4506. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4507&num=0&edition=prelim">4507. Awarding of Ranks in the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4507a&num=0&edition=prelim">4507a. Awarding of ranks to other senior career employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4508&num=0&edition=prelim">4508. Limitation of awards during a Presidential election year</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4509&num=0&edition=prelim">4509. Prohibition of cash award to Executive Schedule officers</a></li>
</ul>

<h6>Subchapter II — Awards for Cost Savings Disclosures</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4511&num=0&edition=prelim">4511. Definition and general provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4512&num=0&edition=prelim">4512. Agency awards for cost savings disclosures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4513&num=0&edition=prelim">4513. Presidential awards for cost savings disclosures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4513&num=0&edition=prelim">4514. [Repealed]</a></li>
</ul>

<h6>Subchapter III — Awards to Law Enforcement Officers for Foreign Language Capabilities</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4521&num=0&edition=prelim">4521. Definition</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4522&num=0&edition=prelim">4522. General provision</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4523&num=0&edition=prelim">4523. Award authority</a></li>
</ul>

<h5>Chapter 47 — Personnel Research Programs and Demonstration Projects</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4701&num=0&edition=prelim">4701. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4702&num=0&edition=prelim">4702. Research programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4703&num=0&edition=prelim">4703. Demonstration projects</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4704&num=0&edition=prelim">4704. Allocation of funds</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4705&num=0&edition=prelim">4705. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4706&num=0&edition=prelim">4706. [Renumbered]</a></li>
</ul>

<h5>Chapter 48 — Agency Personnel Demonstration Project</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4801&num=0&edition=prelim">4801. Nonapplicability of chapter 47</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section4802&num=0&edition=prelim">4802. Securities and Exchange Commission</a></li>
</ul>

<h4>Subpart D — Pay and Allowances</h4>
<h5>Chapter 51 — Classification</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5101&num=0&edition=prelim">5101. Purpose</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5102&num=0&edition=prelim">5102. Definitions; application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5103&num=0&edition=prelim">5103. Determination of applicability</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5104&num=0&edition=prelim">5104. Basis for grading positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5105&num=0&edition=prelim">5105. Standards for classification of positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5106&num=0&edition=prelim">5106. Basis for classifying positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5107&num=0&edition=prelim">5107. Classification of positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5108&num=0&edition=prelim">5108. Classification of positions above GS–15</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5109&num=0&edition=prelim">5109. Positions classified by statute</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5110&num=0&edition=prelim">5110. Review of classification of positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5111&num=0&edition=prelim">5111. Revocation and restoration of authority to classify positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5112&num=0&edition=prelim">5112. General authority of the Office of Personnel Management</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5113&num=0&edition=prelim">5113. Classification records</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5114&num=0&edition=prelim">5114. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5115&num=0&edition=prelim">5115. Regulations</a></li>
</ul>

<h5>Chapter 53 — Pay Rates and Systems</h5>
<h6>Subchapter I — Pay Comparability System</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5301&num=0&edition=prelim">5301. Policy</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5302&num=0&edition=prelim">5302. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5303&num=0&edition=prelim">5303. Annual adjustments to pay schedules</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5304&num=0&edition=prelim">5304. Locality-based comparability payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5304a&num=0&edition=prelim">5304a. Authority to fix an alternative level of comparability payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5305&num=0&edition=prelim">5305. Special pay authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5306&num=0&edition=prelim">5306. Pay fixed by administrative action</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5307&num=0&edition=prelim">5307. Limitation on certain payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5308&num=0&edition=prelim">5308. [Omitted]</a></li>
</ul>

<h6>Subchapter II — Executive Schedule Pay Rates</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5311&num=0&edition=prelim">5311. The Executive Schedule</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5312&num=0&edition=prelim">5312. Positions at level I</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5313&num=0&edition=prelim">5313. Positions at level II</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5314&num=0&edition=prelim">5314. Positions at level III</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5315&num=0&edition=prelim">5315. Positions at level IV</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5316&num=0&edition=prelim">5316. Positions at level V</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5317&num=0&edition=prelim">5317. Presidential authority to place positions at levels IV and V</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5318&num=0&edition=prelim">5318. Adjustments in rates of pay</a></li>
</ul>

<h6>Subchapter III — General Schedule Pay Rates</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5331&num=0&edition=prelim">5331. Definitions; application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5332&num=0&edition=prelim">5332. The General Schedule</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5333&num=0&edition=prelim">5333. Minimum rate for new appointments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5334&num=0&edition=prelim">5334. Rate on change of position or type of appointment; regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5335&num=0&edition=prelim">5335. Periodic step-increases</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5336&num=0&edition=prelim">5336. Additional step-increases</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5337&num=0&edition=prelim">5337. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5338&num=0&edition=prelim">5338. Regulations</a></li>
</ul>

<h6>Subchapter IV — Prevailing Rate Systems</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5341&num=0&edition=prelim">5341. Policy</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5342&num=0&edition=prelim">5342. Definitions; application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5343&num=0&edition=prelim">5343. Prevailing rate determinations; wage schedules; night differentials</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5344&num=0&edition=prelim">5344. Effective date of wage increase; retroactive pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5345&num=0&edition=prelim">5345. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5346&num=0&edition=prelim">5346. Job grading system</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5347&num=0&edition=prelim">5347. Federal Prevailing Rate Advisory Committee</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5348&num=0&edition=prelim">5348. Crews of vessels</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5349&num=0&edition=prelim">5349. Prevailing rate employees; legislative, judicial, Bureau of Engraving and Printing, and government of the District of Columbia</a></li>
</ul>

<h6>Subchapter V — Student-Employees</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5351&num=0&edition=prelim">5351. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5352&num=0&edition=prelim">5352. Stipends</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5353&num=0&edition=prelim">5353. Quarters, subsistence, and laundry</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5354&num=0&edition=prelim">5354. Effect of detail or affiliation; travel expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5355&num=0&edition=prelim">5355. Effect on other statutes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5356&num=0&edition=prelim">5356. Appropriations</a></li>
</ul>

<h6>Subchapter VI — Grade and Pay Retention</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5361&num=0&edition=prelim">5361. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5362&num=0&edition=prelim">5362. Grade retention following a change of positions or reclassification</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5363&num=0&edition=prelim">5363. Pay retention</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5364&num=0&edition=prelim">5364. Remedial actions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5365&num=0&edition=prelim">5365. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5366&num=0&edition=prelim">5366. Appeals</a></li>
</ul>

<h6>Subchapter VII — Miscellaneous Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5371&num=0&edition=prelim">5371. Health care positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5372&num=0&edition=prelim">5372. Administrative law judges</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5372a&num=0&edition=prelim">5372a. Contract appeals board members</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5372b&num=0&edition=prelim">5372b. Administrative appeals judges</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5373&num=0&edition=prelim">5373. Limitation on pay fixed by administrative action</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5374&num=0&edition=prelim">5374. Miscellaneous positions in the executive branch</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5375&num=0&edition=prelim">5375. Police force of the National Zoological Park</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5376&num=0&edition=prelim">5376. Pay for certain senior-level positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5377&num=0&edition=prelim">5377. Pay authority for critical positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5378&num=0&edition=prelim">5378. Police forces of the Bureau of Engraving and Printing and the United States Mint</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5379&num=0&edition=prelim">5379. Student loan repayments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5380&num=0&edition=prelim">5380. Repealed</a></li>
</ul>

<h6>Subchapter VIII — Pay for the Senior Executive Service</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5381&num=0&edition=prelim">5381. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5382&num=0&edition=prelim">5382. Establishment and adjustment of rates of pay for the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5383&num=0&edition=prelim">5383. Setting individual senior executive pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5384&num=0&edition=prelim">5384. Performance awards in the Senior Executive Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5385&num=0&edition=prelim">5385. Regulations</a></li>
</ul>

<h6>Subchapter IX — Special Occupational Pay Systems</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5391&num=0&edition=prelim">5391. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5392&num=0&edition=prelim">5392. Establishment of special occupational pay systems</a></li>
</ul>

<h5>Chapter 54 — Human Capital Performance Fund</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5401&num=0&edition=prelim">5401. Purpose</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5402&num=0&edition=prelim">5402. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5403&num=0&edition=prelim">5403. Human Capital Performance Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5404&num=0&edition=prelim">5404. Human capital performance payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5405&num=0&edition=prelim">5405. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5406&num=0&edition=prelim">5406. Agency plan</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5407&num=0&edition=prelim">5407. Nature of payment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5408&num=0&edition=prelim">5408. Appropriations</a></li>
</ul>

<h5>Chapter 55 — Pay Administration</h5>
<h6>Subchapter I — General Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5501&num=0&edition=prelim">5501. Disposition of money accruing from lapsed salaries or unused appropriations for salaries</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5502&num=0&edition=prelim">5502. Unauthorized office; prohibition on use of funds</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5503&num=0&edition=prelim">5503. Recess appointments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5504&num=0&edition=prelim">5504. Biweekly pay periods; computation of pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5505&num=0&edition=prelim">5505. Monthly pay periods; computation of pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5506&num=0&edition=prelim">5506. Computation of extra pay based on standard or daylight saving time</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5507&num=0&edition=prelim">5507. Officer affidavit; condition to pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5508&num=0&edition=prelim">5508. Officer entitled to leave; effect on pay status</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5509&num=0&edition=prelim">5509. Appropriations</a></li>
</ul>

<h6>Subchapter II — Withholding Pay</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5511&num=0&edition=prelim">5511. Withholding pay; employees removed for cause</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5512&num=0&edition=prelim">5512. Withholding pay; individuals in arrears</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5513&num=0&edition=prelim">5513. Withholding pay; credit disallowed or charge raised for payment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5514&num=0&edition=prelim">5514. Installment deduction for indebtedness because of erroneous payment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5515&num=0&edition=prelim">5515. Crediting amounts received for jury or witness service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5516&num=0&edition=prelim">5516. Withholding District of Columbia income taxes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5517&num=0&edition=prelim">5517. Withholding State income taxes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5518&num=0&edition=prelim">5518. Deductions for State retirement systems; National Guard employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5519&num=0&edition=prelim">5519. Crediting amounts received for certain Reserve or National Guard service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5520&num=0&edition=prelim">5520. Withholding of city or county income or employment taxes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5520a&num=0&edition=prelim">5520a. Garnishment of pay</a></li>
</ul>

<h6>Subchapter III — Advancement, Allotment, and Assignment of Pay</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5521&num=0&edition=prelim">5521. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5522&num=0&edition=prelim">5522. Advance payments; rates; amounts recoverable</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5523&num=0&edition=prelim">5523. Duration of payments; rates; active service period</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5524&num=0&edition=prelim">5524. Review of accounts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5524a&num=0&edition=prelim">5524a. Advance payments for new appointees and employees relocating within the United States and its territories</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5525&num=0&edition=prelim">5525. Allotment and assignment of pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5526&num=0&edition=prelim">5526. Funds available on reimbursable basis</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5527&num=0&edition=prelim">5527. Regulations</a></li>
</ul>

<h6>Subchapter IV — Dual Pay and Dual Employment</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5531&num=0&edition=prelim">5531. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5532&num=0&edition=prelim">5532. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5533&num=0&edition=prelim">5533. Dual pay from more than one position; limitations; exceptions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5534&num=0&edition=prelim">5534. Dual employment and pay of Reserves and National Guardsmen</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5534a&num=0&edition=prelim">5534a. Dual employment and pay during terminal leave from uniformed services</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5535&num=0&edition=prelim">5535. Extra pay for details prohibited</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5536&num=0&edition=prelim">5536. Extra pay for extra services prohibited</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5537&num=0&edition=prelim">5537. Fees for jury and witness service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5538&num=0&edition=prelim">5538. Nonreduction in pay while serving in the uniformed services or National Guard</a></li>
</ul>

<h6>Subchapter V — Premium Pay</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5541&num=0&edition=prelim">5541. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5542&num=0&edition=prelim">5542. Overtime rates; computation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5543&num=0&edition=prelim">5543. Compensatory time off</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5544&num=0&edition=prelim">5544. Wage-board overtime and Sunday rates; computation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5545&num=0&edition=prelim">5545. Night, standby, irregular, and hazardous duty differential</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5545a&num=0&edition=prelim">5545a. Availability pay for criminal investigators</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5545b&num=0&edition=prelim">5545b. Pay for firefighters</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5546&num=0&edition=prelim">5546. Pay for Sunday and holiday work</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5546a&num=0&edition=prelim">5546a. Differential pay for certain employees of the Federal Aviation Administration and the Department of Defense</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5547&num=0&edition=prelim">5547. Limitation on premium pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5548&num=0&edition=prelim">5548. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5549&num=0&edition=prelim">5549. Effect on other statutes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5550&num=0&edition=prelim">5550. Border patrol rate of pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5550a&num=0&edition=prelim">5550a. Compensatory time off for religious observances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5550b&num=0&edition=prelim">5550b. Compensatory time off for travel</a></li>
</ul>

<h6>Subchapter VI — Payment for Accumulated and Accrued Leave</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5551&num=0&edition=prelim">5551. Lump-sum payment for accumulated and accrued leave on separation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5552&num=0&edition=prelim">5552. Lump-sum payment for accumulated and accrued leave on entering active duty; election</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5553&num=0&edition=prelim">5553. Regulations</a></li>
</ul>

<h6>Subchapter VII — Payments to Missing Employees</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5561&num=0&edition=prelim">5561. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5562&num=0&edition=prelim">5562. Pay and allowances; continuance while in a missing status; limitations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5563&num=0&edition=prelim">5563. Allotments; continuance, suspension, initiation, resumption, or increase while in a missing status; limitations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5564&num=0&edition=prelim">5564. Travel and transportation; dependents; household and personal effects; motor vehicles; sale of bulky items; claims for proceeds; appropriation chargeable</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5565&num=0&edition=prelim">5565. Agency review</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5566&num=0&edition=prelim">5566. Agency determinations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5567&num=0&edition=prelim">5567. Settlement of accounts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5568&num=0&edition=prelim">5568. Income tax deferment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5569&num=0&edition=prelim">5569. Benefits for captives</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5570&num=0&edition=prelim">5570. Compensation for disability or death</a></li>
</ul>

<h6>Subchapter VIII — Settlement of Accounts</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5581&num=0&edition=prelim">5581. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5582&num=0&edition=prelim">5582. Designation of beneficiary; order of precedence</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5583&num=0&edition=prelim">5583. Payment of money due; settlement of accounts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5584&num=0&edition=prelim">5584. Claims for overpayment of pay and allowances, and of travel, transportation and relocation expenses and allowances</a></li>
</ul>

<h6>Subchapter IX — Severance Pay and Back Pay</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5591&num=0&edition=prelim">5591 to 5594. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5595&num=0&edition=prelim">5595. Severance pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5596&num=0&edition=prelim">5596. Back pay due to unjustified personnel action</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5597&num=0&edition=prelim">5597. Separation pay</a></li>
</ul>

<h5>Chapter 57 — Travel, Transportation, and Subsistence</h5>
<h6>Subchapter I — Travel and Subsistence Expenses; Mileage Allowances</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5701&num=0&edition=prelim">5701. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5702&num=0&edition=prelim">5702. Per diem; employees traveling on official business</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5703&num=0&edition=prelim">5703. Per diem, travel, and transportation expenses; experts and consultants; individuals serving without pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5704&num=0&edition=prelim">5704. Mileage and related allowances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5705&num=0&edition=prelim">5705. Advancements and deductions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5706&num=0&edition=prelim">5706. Allowable travel expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5706a&num=0&edition=prelim">5706a. Subsistence and travel expenses for threatened law enforcement personnel</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5706b&num=0&edition=prelim">5706b. Interview expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5706c&num=0&edition=prelim">5706c. Reimbursement for taxes incurred on money received for travel expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5707&num=0&edition=prelim">5707. Regulations and reports</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5707a&num=0&edition=prelim">5707a. Adherence to fire safety guidelines in establishing rates and discounts for lodging expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5708&num=0&edition=prelim">5708. Effect on other statutes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5709&num=0&edition=prelim">5709. Air evacuation patients: furnished subsistence</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5710&num=0&edition=prelim">5710. Authority for travel expenses test programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5711&num=0&edition=prelim">5711. Authority for telework travel expenses programs</a></li>
</ul>

<h6>Subchapter II — Travel and Transportation Expenses; New Appointees, Student Trainees, and Transferred Employees</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5721&num=0&edition=prelim">5721. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5722&num=0&edition=prelim">5722. Travel and transportation expenses of new appointees; posts of duty outside the continental United States</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5723&num=0&edition=prelim">5723. Travel and transportation expenses of new appointees and student trainees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5724&num=0&edition=prelim">5724. Travel and transportation expenses of employees transferred; advancement of funds; reimbursement on commuted basis</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5724a&num=0&edition=prelim">5724a. Relocation expenses of employees transferred or reemployed</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5724b&num=0&edition=prelim">5724b. Taxes on reimbursements for travel, transportation, and relocation expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5724c&num=0&edition=prelim">5724c. Relocation services</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5724d&num=0&edition=prelim">5724d. Transportation and moving expenses for immediate family of certain deceased Federal employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5725&num=0&edition=prelim">5725. Transportation expenses; employees assigned to danger areas</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5726&num=0&edition=prelim">5726. Storage expenses; household goods and personal effects</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5727&num=0&edition=prelim">5727. Transportation of motor vehicles</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5728&num=0&edition=prelim">5728. Travel and transportation expenses; vacation leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5729&num=0&edition=prelim">5729. Transportation expenses; prior return of family</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5730&num=0&edition=prelim">5730. Funds available</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5731&num=0&edition=prelim">5731. Expenses limited to lowest first-class rate</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5732&num=0&edition=prelim">5732. General average contribution; payment or reimbursement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5733&num=0&edition=prelim">5733. Expeditious travel</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5734&num=0&edition=prelim">5734. Travel, transportation, and relocation expenses of employees transferred from the Postal Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5735&num=0&edition=prelim">5735. Travel, transportation, and relocation expenses of employees transferring to the United States Postal Service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5736&num=0&edition=prelim">5736. Travel, transportation, and relocation expenses of certain nonappropriated fund employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5737&num=0&edition=prelim">5737. Relocation expenses of an employee who is performing an extended assignment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5737a&num=0&edition=prelim">5737a. Employees temporarily deployed in contingency operations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5738&num=0&edition=prelim">5738. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5739&num=0&edition=prelim">5739. Authority for relocation expenses test programs</a></li>
</ul>

<h6>Subchapter III — Transportation of Remains, Dependents, and Effects</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5741&num=0&edition=prelim">5741. General prohibition</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5742&num=0&edition=prelim">5742. Transportation of remains, dependents, and effects; death occurring away from official station or abroad</a></li>
</ul>

<h6>Subchapter IV — Miscellaneous Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5751&num=0&edition=prelim">5751. Travel expenses of witnesses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5752&num=0&edition=prelim">5752. Travel expenses of Senior Executive Service candidates</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5753&num=0&edition=prelim">5753. Recruitment and relocation bonuses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5754&num=0&edition=prelim">5754. Retention bonuses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5755&num=0&edition=prelim">5755. Supervisory differentials</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5756&num=0&edition=prelim">5756. Home marketing incentive payment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5757&num=0&edition=prelim">5757. 2Payment of expenses to obtain professional credentials</a></li>

  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5757&num=0&edition=prelim">5757. 2Extended assignment incentive</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5759&num=0&edition=prelim">5759. Retention and relocation bonuses for the Federal Bureau of Investigation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5760&num=0&edition=prelim">5760. Travel and transportation allowances: transportation of family members incident to the repatriation of employees held captive</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5761&num=0&edition=prelim">5761. Foreign language proficiency pay awards for the Federal Bureau of Investigation</a></li>
</ul>

<h5>Chapter 59 — Allowances</h5>
<h6>Subchapter I — Uniforms</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5901&num=0&edition=prelim">5901. Uniform allowances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5902&num=0&edition=prelim">5902. Increase in maximum uniform allowance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5903&num=0&edition=prelim">5903. Regulations</a></li>
</ul>

<h6>Subchapter II — Quarters</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5911&num=0&edition=prelim">5911. Quarters and facilities; employees in the United States</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5912&num=0&edition=prelim">5912. Quarters in Government owned or rented buildings; employees in foreign countries</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5913&num=0&edition=prelim">5913. Official residence expenses</a></li>
</ul>

<h6>Subchapter III — Overseas Differentials and Allowances</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5921&num=0&edition=prelim">5921. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5922&num=0&edition=prelim">5922. General provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5923&num=0&edition=prelim">5923. Quarters allowances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5924&num=0&edition=prelim">5924. Cost-of-living allowances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5925&num=0&edition=prelim">5925. Post differentials</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5926&num=0&edition=prelim">5926. Compensatory time off at certain posts in foreign areas</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5927&num=0&edition=prelim">5927. Advances of pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5928&num=0&edition=prelim">5928. Danger pay allowance</a></li>
</ul>

<h6>Subchapter IV — Miscellaneous Allowances</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5941&num=0&edition=prelim">5941. Allowances based on living costs and conditions of environment; employees stationed outside continental United States or in Alaska</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5942&num=0&edition=prelim">5942. Allowance based on duty at remote worksites</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5942a&num=0&edition=prelim">5942a. Separate maintenance allowance for duty at Johnston Island</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5943&num=0&edition=prelim">5943. Foreign currency appreciation allowances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5944&num=0&edition=prelim">5944. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5945&num=0&edition=prelim">5945. Notary public commission expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5946&num=0&edition=prelim">5946. Membership fees; expenses of attendance at meetings; limitations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5947&num=0&edition=prelim">5947. Quarters, subsistence, and allowances for employees of the Corps of Engineers, Department of the Army, engaged in floating plant operations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5948&num=0&edition=prelim">5948. Physicians comparability allowances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section5949&num=0&edition=prelim">5949. Hostile fire pay</a></li>
</ul>

<h4>Subpart E — Attendance and Leave</h4>
<h5>Chapter 61 — Hours of Work</h5>
<h6>Subchapter I — General Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6101&num=0&edition=prelim">6101. Basic 40-hour workweek; work schedules; regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6102&num=0&edition=prelim">6102. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6103&num=0&edition=prelim">6103. Holidays</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6104&num=0&edition=prelim">6104. Holidays; daily, hourly, and piece-work basis employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6105&num=0&edition=prelim">6105. Closing of Executive departments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6106&num=0&edition=prelim">6106. Time clocks; restrictions</a></li>
</ul>
        
<h6>Subchapter II — Flexible and Compressed Work Schedules</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6120&num=0&edition=prelim">6120. Purpose</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6121&num=0&edition=prelim">6121. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6122&num=0&edition=prelim">6122. Flexible schedules; agencies authorized to use</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6123&num=0&edition=prelim">6123. Flexible schedules; computation of premium pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6124&num=0&edition=prelim">6124. Flexible schedules; holidays</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6125&num=0&edition=prelim">6125. Flexible schedules; time-recording devices</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6126&num=0&edition=prelim">6126. Flexible schedules; credit hours; accumulation and compensation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6127&num=0&edition=prelim">6127. Compressed schedules; agencies authorized to use</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6128&num=0&edition=prelim">6128. Compressed schedules; computation of premium pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6129&num=0&edition=prelim">6129. Administration of leave and retirement provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6130&num=0&edition=prelim">6130. Application of programs in the case of collective bargaining agreements</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6131&num=0&edition=prelim">6131. Criteria and review</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6132&num=0&edition=prelim">6132. Prohibition of coercion</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6133&num=0&edition=prelim">6133. Regulations; technical assistance; program review</a></li>
</ul>

<h5>Chapter 63 — Leave</h5>
<h6>Subchapter I — Annual and Sick Leave</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6301&num=0&edition=prelim">6301. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6302&num=0&edition=prelim">6302. General provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6303&num=0&edition=prelim">6303. Annual leave; accrual</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6304&num=0&edition=prelim">6304. Annual leave; accumulation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6305&num=0&edition=prelim">6305. Home leave; leave for Chiefs of Missions; leave for crews of vessels</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6306&num=0&edition=prelim">6306. Annual leave; refund of lump-sum payment; recredit of annual leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6307&num=0&edition=prelim">6307. Sick leave; accrual and accumulation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6308&num=0&edition=prelim">6308. Transfers between positions under different leave systems</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6309&num=0&edition=prelim">6309. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6310&num=0&edition=prelim">6310. Leave of absence; aliens</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6311&num=0&edition=prelim">6311. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6312&num=0&edition=prelim">6312. Accrual and accumulation for former ASCS county office and nonappropriated fund employees</a></li>
</ul>

<h6>Subchapter II — Other Paid Leave</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6321&num=0&edition=prelim">6321. Absence of veterans to attend funeral services</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6322&num=0&edition=prelim">6322. Leave for jury or witness service; official duty status for certain witness service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6323&num=0&edition=prelim">6323. Military leave; Reserves and National Guardsmen</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6324&num=0&edition=prelim">6324. Absence of certain police and firemen</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6325&num=0&edition=prelim">6325. Absence resulting from hostile action abroad</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6326&num=0&edition=prelim">6326. Absence in connection with funerals of immediate relatives in the Armed Forces</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6327&num=0&edition=prelim">6327. Absence in connection with serving as a bone-marrow or organ donor</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6328&num=0&edition=prelim">6328. Absence in connection with funerals of fellow Federal law enforcement officers</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6329&num=0&edition=prelim">6329. Disabled veteran leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6329a&num=0&edition=prelim">6329a. Administrative leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6329b&num=0&edition=prelim">6329b. Investigative leave and notice leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6329c&num=0&edition=prelim">6329c. Weather and safety leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6329d&num=0&edition=prelim">6329d. Parental bereavement leave</a></li>
</ul>

<h6>Subchapter III — Voluntary Transfers of Leave</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6331&num=0&edition=prelim">6331. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6332&num=0&edition=prelim">6332. General authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6333&num=0&edition=prelim">6333. Receipt and use of transferred leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6334&num=0&edition=prelim">6334. Donations of leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6335&num=0&edition=prelim">6335. Termination of medical emergency</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6336&num=0&edition=prelim">6336. Restoration of transferred leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6337&num=0&edition=prelim">6337. Accrual of leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6338&num=0&edition=prelim">6338. Prohibition of coercion</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6339&num=0&edition=prelim">6339. Additional leave transfer programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6340&num=0&edition=prelim">6340. Inapplicability of certain provisions</a></li>
</ul>

<h6>Subchapter IV — Voluntary Leave Bank Program</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6361&num=0&edition=prelim">6361. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6362&num=0&edition=prelim">6362. General authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6363&num=0&edition=prelim">6363. Establishment of leave banks</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6364&num=0&edition=prelim">6364. Establishment of Leave Bank Boards</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6365&num=0&edition=prelim">6365. Contributions of annual leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6366&num=0&edition=prelim">6366. Eligibility for leave recipients</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6367&num=0&edition=prelim">6367. Receipt and use of leave from a leave bank</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6368&num=0&edition=prelim">6368. Termination of medical emergency</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6369&num=0&edition=prelim">6369. Restoration of transferred leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6370&num=0&edition=prelim">6370. Prohibition of coercion</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6371&num=0&edition=prelim">6371. Accrual of leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6372&num=0&edition=prelim">6372. Additional leave bank programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6373&num=0&edition=prelim">6373. Authority to participate in both programs</a></li>
</ul>

<h6>Subchapter V — Family and Medical Leave</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6381&num=0&edition=prelim">6381. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6382&num=0&edition=prelim">6382. Leave requirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6383&num=0&edition=prelim">6383. Certification</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6384&num=0&edition=prelim">6384. Employment and benefits protection</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6385&num=0&edition=prelim">6385. Prohibition of coercion</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6386&num=0&edition=prelim">6386. Health insurance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6387&num=0&edition=prelim">6387. Regulations</a></li>
</ul>

<h6>Subchapter VI — Leave Transfer in Disasters and Emergencies</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6391&num=0&edition=prelim">6391. Authority for leave transfer program in disasters and emergencies</a></li>
</ul>

<h5>Chapter 65 — Telework</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6501&num=0&edition=prelim">6501. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6502&num=0&edition=prelim">6502. Executive agencies telework requirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6503&num=0&edition=prelim">6503. Training and monitoring</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6504&num=0&edition=prelim">6504. Policy and support</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6505&num=0&edition=prelim">6505. Telework Managing Officer</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section6506&num=0&edition=prelim">6506. Reports</a></li>
</ul>

<h4>Subpart F — Labor-Management and Employee Relations</h4>
<h5>Chapter 71 — Labor-Management Relations</h5>
<h6>Subchapter I — General Provisions</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7101&num=0&edition=prelim">7101. Findings and purpose</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7102&num=0&edition=prelim">7102. Employees' rights</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7103&num=0&edition=prelim">7103. Definitions; application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7104&num=0&edition=prelim">7104. Federal Labor Relations Authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7105&num=0&edition=prelim">7105. Powers and duties of the Authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7106&num=0&edition=prelim">7106. Management rights</a></li>
</ul>

<h6>Subchapter II — Rights and Duties of Agencies and Labor Organizations</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7111&num=0&edition=prelim">7111. Exclusive recognition of labor organizations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7112&num=0&edition=prelim">7112. Determination of appropriate units for labor organization representation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7113&num=0&edition=prelim">7113. National consultation rights</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7114&num=0&edition=prelim">7114. Representation rights and duties</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7115&num=0&edition=prelim">7115. Allotments to representatives</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7116&num=0&edition=prelim">7116. Unfair labor practices</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7117&num=0&edition=prelim">7117. Duty to bargain in good faith; compelling need; duty to consult</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7118&num=0&edition=prelim">7118. Prevention of unfair labor practices</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7119&num=0&edition=prelim">7119. Negotiation impasses; Federal Service Impasses Panel</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7120&num=0&edition=prelim">7120. Standards of conduct for labor organizations</a></li>
</ul>

<h6>Subchapter III — Grievances, Appeals, and Review</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7121&num=0&edition=prelim">7121. Grievance procedures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7122&num=0&edition=prelim">7122. Exceptions to arbitral awards</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7123&num=0&edition=prelim">7123. Judicial review; enforcement</a></li>
</ul>

<h6>Subchapter IV — Administrative and Other Provisions</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7131&num=0&edition=prelim">7131. Official time</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7132&num=0&edition=prelim">7132. Subpenas</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7133&num=0&edition=prelim">7133. Compilation and publication of data</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7134&num=0&edition=prelim">7134. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7135&num=0&edition=prelim">7135. Continuation of existing laws, recognitions, agreements, and procedures</a></li>
</ul>

<h5>Chapter 72 — Antidiscrimination; Right to Petition Congress</h5>
<h6>Subchapter I — Antidiscrimination in Employment</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7201&num=0&edition=prelim">7201. Antidiscrimination policy; minority recruitment program</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7202&num=0&edition=prelim">7202. Marital status</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7203&num=0&edition=prelim">7203. Handicapping condition</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7204&num=0&edition=prelim">7204. Other prohibitions</a></li>
</ul>

<h6>Subchapter II — Employees' Right to Petition Congress</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7211&num=0&edition=prelim">7211. Employees' right to petition Congress</a></li>
</ul>

<h5>Chapter 73 — Suitability, Security, and Conduct</h5>
<h6>Subchapter I — Regulation of Conduct</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7301&num=0&edition=prelim">7301. Presidential regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7302&num=0&edition=prelim">7302. Post-employment notification</a></li>
</ul>

<h6>Subchapter II — Employment Limitations</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7311&num=0&edition=prelim">7311. Loyalty and striking</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7312&num=0&edition=prelim">7312. Employment and clearance; individuals removed for national security</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7313&num=0&edition=prelim">7313. Riots and civil disorders</a></li>
</ul>

<h6>Subchapter III — Political Activities</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7321&num=0&edition=prelim">7321. Political participation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7322&num=0&edition=prelim">7322. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7323&num=0&edition=prelim">7323. Political activity authorized; prohibitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7324&num=0&edition=prelim">7324. Political activities on duty; prohibition</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7325&num=0&edition=prelim">7325. Political activity permitted; employees residing in certain municipalities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7326&num=0&edition=prelim">7326. Penalties</a></li>
</ul>

<h6>Subchapter IV — Foreign Gifts and Decorations</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7341&num=0&edition=prelim">7341. [Repealed]</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7342&num=0&edition=prelim">7342. Receipt and disposition of foreign gifts and decorations</a></li>
</ul>

<h6>Subchapter V — Misconduct</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7351&num=0&edition=prelim">7351. Gifts to superiors</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7352&num=0&edition=prelim">7352. Excessive and habitual use of intoxicants</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7353&num=0&edition=prelim">7353. Gifts to Federal employees</a></li>
</ul>

<h6>Subchapter VI — Drug Abuse, Alcohol Abuse, and Alcoholism</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7361&num=0&edition=prelim">7361. Drug abuse</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7362&num=0&edition=prelim">7362. Alcohol abuse and alcoholism</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7363&num=0&edition=prelim">7363. Reports to Congress</a></li>
 </ul>

<h6>Subchapter VII — Mandatory Removal From Employment of Convicted Law Enforcement Officers</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7371&num=0&edition=prelim">7371. Mandatory removal from employment of law enforcement officers convicted of felonies</a></li>
 </ul>

<h5>Chapter 75 — Adverse Actions</h5>
<h6>Subchapter I — Suspension of 14 Days or Less</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7501&num=0&edition=prelim">7501. Definitions</a></li>
    </ul>
    

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7502&num=0&edition=prelim">7502. Actions covered</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7503&num=0&edition=prelim">7503. Cause and procedure</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7504&num=0&edition=prelim">7504. Regulations</a></li>
      </ul>

<h6>Subchapter II — Removal, Suspension for More Than 14 Days, Reduction in Grade or Pay, or Furlough for 30 Days or Less</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7511&num=0&edition=prelim">7511. Definitions; application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7512&num=0&edition=prelim">7512. Actions covered</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7513&num=0&edition=prelim">7513. Cause and procedure</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7514&num=0&edition=prelim">7514. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7515&num=0&edition=prelim">7515. Discipline of supervisors based on retaliation against whistleblowers</a></li>
      </ul>

<h6>Subchapter III — Administrative Law Judges</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7521&num=0&edition=prelim">7521. Actions against administrative law judges</a></li>
</ul>

<h6>Subchapter IV — National Security</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7531&num=0&edition=prelim">7531. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7532&num=0&edition=prelim">7532. Suspension and removal</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7533&num=0&edition=prelim">7533. Effect on other statutes</a></li>
</ul>

<h6>Subchapter V — Senior Executive Service</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7541&num=0&edition=prelim">7541. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7542&num=0&edition=prelim">7542. Actions covered</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7543&num=0&edition=prelim">7543. Cause and procedure</a></li>
</ul>

<h5>Chapter 77 — Appeals</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7701&num=0&edition=prelim">7701. Appellate procedures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7702&num=0&edition=prelim">7702. Actions involving discrimination</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7703&num=0&edition=prelim">7703. Judicial review of decisions of the Merit Systems Protection Board</a></li>
</ul>

<h5>Chapter 79 — Services to Employees</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7901&num=0&edition=prelim">7901. Health service programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7902&num=0&edition=prelim">7902. Safety programs</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7903&num=0&edition=prelim">7903. Protective clothing and equipment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7904&num=0&edition=prelim">7904. Employee assistance programs relating to drug abuse and alcohol abuse</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7905&num=0&edition=prelim">7905. Programs to encourage commuting by means other than single-occupancy motor vehicles</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section7906&num=0&edition=prelim">7906. Services of post-combat case coordinators</a></li>
</ul>

<h4>Subpart G — Insurance and Annuities</h4>
<h5>Chapter 81 — Compensation for Work Injuries</h5>
<h6>Subchapter I — Generally</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8101&num=0&edition=prelim">8101. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8102&num=0&edition=prelim">8102. Compensation for disability or death of employee</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8102a&num=0&edition=prelim">8102a. Death gratuity for injuries incurred in connection with employee's service with an Armed Force</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8103&num=0&edition=prelim">8103. Medical services and initial medical and other benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8104&num=0&edition=prelim">8104. Vocational rehabilitation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8105&num=0&edition=prelim">8105. Total disability</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8106&num=0&edition=prelim">8106. Partial disability</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8107&num=0&edition=prelim">8107. Compensation schedule</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8108&num=0&edition=prelim">8108. Reduction of compensation for subsequent injury to same member</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8109&num=0&edition=prelim">8109. Beneficiaries of awards unpaid at death; order of precedence</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8110&num=0&edition=prelim">8110. Augmented compensation for dependents</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8111&num=0&edition=prelim">8111. Additional compensation for services of attendants or vocational rehabilitation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8112&num=0&edition=prelim">8112. Maximum and minimum monthly payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8113&num=0&edition=prelim">8113. Increase or decrease of basic compensation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8114&num=0&edition=prelim">8114. Computation of pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8115&num=0&edition=prelim">8115. Determination of wage-earning capacity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8116&num=0&edition=prelim">8116. Limitations on right to receive compensation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8117&num=0&edition=prelim">8117. Time of accrual of right</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8118&num=0&edition=prelim">8118. Election to use annual or sick leave</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8119&num=0&edition=prelim">8119. Notice of injury or death</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8120&num=0&edition=prelim">8120. Report of injury</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8121&num=0&edition=prelim">8121. Claim</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8122&num=0&edition=prelim">8122. Time for making claim</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8123&num=0&edition=prelim">8123. Physical examinations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8124&num=0&edition=prelim">8124. Findings and award; hearings</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8125&num=0&edition=prelim">8125. Misbehavior at proceedings</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8126&num=0&edition=prelim">8126. Subpenas; oaths; examination of witnesses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8127&num=0&edition=prelim">8127. Representation; attorneys' fees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8128&num=0&edition=prelim">8128. Review of award</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8129&num=0&edition=prelim">8129. Recovery of overpayments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8130&num=0&edition=prelim">8130. Assignment of claim</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8131&num=0&edition=prelim">8131. Subrogation of the United States</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8132&num=0&edition=prelim">8132. Adjustment after recovery from a third person</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8133&num=0&edition=prelim">8133. Compensation in case of death</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8134&num=0&edition=prelim">8134. Funeral expenses; transportation of body</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8135&num=0&edition=prelim">8135. Lump-sum payment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8136&num=0&edition=prelim">8136. Initial payments outside the United States</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8137&num=0&edition=prelim">8137. Compensation for noncitizens and nonresidents</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8138&num=0&edition=prelim">8138. Minimum limit modification for noncitizens and aliens</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8139&num=0&edition=prelim">8139. Employees of the District of Columbia</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8140&num=0&edition=prelim">8140. Members of the Reserve Officers' Training Corps</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8141&num=0&edition=prelim">8141. Civil Air Patrol volunteers</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8142&num=0&edition=prelim">8142. Peace Corps volunteers</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8143&num=0&edition=prelim">8143. Job Corps enrollees; volunteers in service to America</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8143a&num=0&edition=prelim">8143a. Members of the National Teacher Corps</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8143b&num=0&edition=prelim">8143b. Employees in fire protection activities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8144&num=0&edition=prelim">8144. Student-employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8145&num=0&edition=prelim">8145. Administration</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8146&num=0&edition=prelim">8146. Administration for the Panama Canal Commission and The Alaska Railroad</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8146a&num=0&edition=prelim">8146a. Cost-of-living adjustment of compensation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8147&num=0&edition=prelim">8147. Employees' Compensation Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8148&num=0&edition=prelim">8148. Forfeiture of benefits by convicted felons</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8149&num=0&edition=prelim">8149. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8150&num=0&edition=prelim">8150. Effect on other statutes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8151&num=0&edition=prelim">8151. Civil service retention rights</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8152&num=0&edition=prelim">8152. Annual report</a></li>
</ul>

<h6>Subchapter II — Employees of Nonappropriated Fund Instrumentalities</h6>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8171&num=0&edition=prelim">8171. Compensation for work injuries; generally</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8172&num=0&edition=prelim">8172. Employees not citizens or residents of the United States</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8173&num=0&edition=prelim">8173. Liability under this subchapter exclusive</a></li>
</ul>

<h6>Subchapter III — Law Enforcement Officers Not Employed by the United States</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8191&num=0&edition=prelim">8191. Determination of eligibility</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8192&num=0&edition=prelim">8192. Benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8193&num=0&edition=prelim">8193. Administration</a></li>
</ul>

<h5>Chapter 83 — Retirement</h5>
<h6>Subchapter I — General Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8301&num=0&edition=prelim">8301. Uniform retirement date</a></li>
</ul>

<h6>Subchapter II — Forfeiture of Annuities and Retired Pay</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8311&num=0&edition=prelim">8311. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8312&num=0&edition=prelim">8312. Conviction of certain offenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8313&num=0&edition=prelim">8313. Absence from the United States to avoid prosecution</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8314&num=0&edition=prelim">8314. Refusal to testify</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8315&num=0&edition=prelim">8315. Falsifying employment applications</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8316&num=0&edition=prelim">8316. Refund of contributions and deposits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8317&num=0&edition=prelim">8317. Repayment of annuity or retired pay properly paid; waiver</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8318&num=0&edition=prelim">8318. Restoration of annuity or retired pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8319&num=0&edition=prelim">8319. Removal of members of the uniformed services from rolls; restoration; reappointment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8320&num=0&edition=prelim">8320. Offense or violation committed in compliance with orders</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8321&num=0&edition=prelim">8321. Liability of accountable employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8322&num=0&edition=prelim">8322. Effect on other statutes</a></li>
</ul>

<h6>Subchapter III — Civil Service Retirement</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8331&num=0&edition=prelim">8331. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8332&num=0&edition=prelim">8332. Creditable service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8333&num=0&edition=prelim">8333. Eligibility for annuity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8334&num=0&edition=prelim">8334. Deductions, contributions, and deposits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8335&num=0&edition=prelim">8335. Mandatory separation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8336&num=0&edition=prelim">8336. Immediate retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8336a&num=0&edition=prelim">8336a. Phased retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8337&num=0&edition=prelim">8337. Disability retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8338&num=0&edition=prelim">8338. Deferred retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8339&num=0&edition=prelim">8339. Computation of annuity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8340&num=0&edition=prelim">8340. Cost-of-living adjustment of annuities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8341&num=0&edition=prelim">8341. Survivor annuities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8342&num=0&edition=prelim">8342. Lump-sum benefits; designation of beneficiary; order of precedence</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8343&num=0&edition=prelim">8343. Additional annuities; voluntary contributions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8343a&num=0&edition=prelim">8343a. Alternative forms of annuities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8344&num=0&edition=prelim">8344. Annuities and pay on reemployment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8345&num=0&edition=prelim">8345. Payment of benefits; commencement, termination, and waiver of annuity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8345a&num=0&edition=prelim">8345a. Embezzlement or conversion of payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8346&num=0&edition=prelim">8346. Exemption from legal process; recovery of payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8347&num=0&edition=prelim">8347. Administration; regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8348&num=0&edition=prelim">8348. Civil Service Retirement and Disability Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8349&num=0&edition=prelim">8349. Offset relating to certain benefits under the Social Security Act</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8350&num=0&edition=prelim">8350. Retirement counseling</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8351&num=0&edition=prelim">8351. Participation in the Thrift Savings Plan</a></li>
</ul>
        
<h5>Chapter 84 — Federal Employees' Retirement System</h5>
<h6>Subchapter I — General Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8401&num=0&edition=prelim">8401. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8402&num=0&edition=prelim">8402. Federal Employees' Retirement System; exclusions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8403&num=0&edition=prelim">8403. Relationship to the Social Security Act</a></li>
</ul>

<h6>Subchapter II — Basic Annuity</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8410&num=0&edition=prelim">8410. Eligibility for annuity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8411&num=0&edition=prelim">8411. Creditable service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8412&num=0&edition=prelim">8412. Immediate retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8412a&num=0&edition=prelim">8412a. Phased retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8413&num=0&edition=prelim">8413. Deferred retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8414&num=0&edition=prelim">8414. Early retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8415&num=0&edition=prelim">8415. Computation of basic annuity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8416&num=0&edition=prelim">8416. Survivor reduction for a current spouse</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8417&num=0&edition=prelim">8417. Survivor reduction for a former spouse</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8418&num=0&edition=prelim">8418. Survivor elections; deposit; offsets</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8419&num=0&edition=prelim">8419. Survivor reductions; computation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8420&num=0&edition=prelim">8420. Insurable interest reductions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8420a&num=0&edition=prelim">8420a. Alternative forms of annuities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8421&num=0&edition=prelim">8421. Annuity supplement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8421a&num=0&edition=prelim">8421a. Reductions on account of earnings from work performed while entitled to an annuity supplement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8422&num=0&edition=prelim">8422. Deductions from pay; contributions for other service; deposits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8423&num=0&edition=prelim">8423. Government contributions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8424&num=0&edition=prelim">8424. Lump-sum benefits; designation of beneficiary; order of precedence</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8425&num=0&edition=prelim">8425. Mandatory separation</a></li>
</ul>

<h6>Subchapter III — Thrift Savings Plan</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8431&num=0&edition=prelim">8431. Certain transfers to be treated as a separation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8432&num=0&edition=prelim">8432. Contributions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8432a&num=0&edition=prelim">8432a. Payment of lost earnings</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8432b&num=0&edition=prelim">8432b. Contributions of persons who perform military service</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8432c&num=0&edition=prelim">8432c. Contributions of certain persons reemployed after service with international organizations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8432d&num=0&edition=prelim">8432d. Qualified Roth contribution program</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8433&num=0&edition=prelim">8433. Benefits and election of benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8434&num=0&edition=prelim">8434. Annuities: methods of payment; election; purchase</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8435&num=0&edition=prelim">8435. Protections for spouses and former spouses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8436&num=0&edition=prelim">8436. Administrative provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8437&num=0&edition=prelim">8437. Thrift Savings Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8438&num=0&edition=prelim">8438. Investment of Thrift Savings Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8439&num=0&edition=prelim">8439. Accounting and information</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8440&num=0&edition=prelim">8440. Tax treatment of the Thrift Savings Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8440a&num=0&edition=prelim">8440a. Justices and judges</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8440b&num=0&edition=prelim">8440b. Bankruptcy judges and magistrate judges</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8440c&num=0&edition=prelim">8440c. Court of Federal Claims judges</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8440d&num=0&edition=prelim">8440d. Judges of the United States Court of Appeals for Veterans Claims</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8440e&num=0&edition=prelim">8440e. Members of the uniformed services</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8440f&num=0&edition=prelim">8440f. Maximum percentage allowable for certain participants</a></li>
</ul>

<h6>Subchapter IV — Survivor Annuities</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8441&num=0&edition=prelim">8441. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8442&num=0&edition=prelim">8442. Rights of a widow or widower</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8443&num=0&edition=prelim">8443. Rights of a child</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8444&num=0&edition=prelim">8444. Rights of a named individual with an insurable interest</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8445&num=0&edition=prelim">8445. Rights of a former spouse</a></li>
</ul>

<h6>Subchapter V — Disability Benefits</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8451&num=0&edition=prelim">8451. Disability retirement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8452&num=0&edition=prelim">8452. Computation of disability annuity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8453&num=0&edition=prelim">8453. Application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8454&num=0&edition=prelim">8454. Medical examination</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8455&num=0&edition=prelim">8455. Recovery; restoration of earning capacity</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8456&num=0&edition=prelim">8456. Military reserve technicians</a></li>
</ul>

<h6>Subchapter VI — General and Administrative Provisions</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8461&num=0&edition=prelim">8461. Authority of the Office of Personnel Management</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8462&num=0&edition=prelim">8462. Cost-of-living adjustments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8463&num=0&edition=prelim">8463. Rate of benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8464&num=0&edition=prelim">8464. Commencement and termination of annuities of employees and Members</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8464a&num=0&edition=prelim">8464a. Relationship between annuity and workers' compensation</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8465&num=0&edition=prelim">8465. Waiver, allotment, and assignment of benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8466&num=0&edition=prelim">8466. Application for benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8466a&num=0&edition=prelim">8466a. Embezzlement or conversion of payments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8467&num=0&edition=prelim">8467. Court orders</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8468&num=0&edition=prelim">8468. Annuities and pay on reemployment</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8469&num=0&edition=prelim">8469. Withholding of State income taxes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8470&num=0&edition=prelim">8470. Exemption from legal process; recovery of payments</a></li>
</ul>

<h6>Subchapter VII — Federal Retirement Thrift Investment Management System</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8471&num=0&edition=prelim">8471. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8472&num=0&edition=prelim">8472. Federal Retirement Thrift Investment Board</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8473&num=0&edition=prelim">8473. Employee Thrift Advisory Council</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8474&num=0&edition=prelim">8474. Executive Director</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8475&num=0&edition=prelim">8475. Investment policies</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8476&num=0&edition=prelim">8476. Administrative provisions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8477&num=0&edition=prelim">8477. Fiduciary responsibilities; liability and penalties</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8478&num=0&edition=prelim">8478. Bonding</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8478a&num=0&edition=prelim">8478a. Investigative authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8479&num=0&edition=prelim">8479. Exculpatory provisions; insurance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8480&num=0&edition=prelim">8480. Subpoena authority</a></li>
</ul>

<h5>Chapter 85 — Unemployment Compensation</h5>
<h6>Subchapter I — Employees Generally</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8501&num=0&edition=prelim">8501. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8502&num=0&edition=prelim">8502. Compensation under State agreement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8503&num=0&edition=prelim">8503. Compensation absent State agreement</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8504&num=0&edition=prelim">8504. Assignment of Federal service and wages</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8505&num=0&edition=prelim">8505. Payments to States</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8506&num=0&edition=prelim">8506. Dissemination of information</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8507&num=0&edition=prelim">8507. False statements and misrepresentations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8508&num=0&edition=prelim">8508. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8509&num=0&edition=prelim">8509. Federal Employees Compensation Account</a></li>
</ul>

<h6>Subchapter II — Ex-Servicemen</h6>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8521&num=0&edition=prelim">8521. Definitions; application</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8522&num=0&edition=prelim">8522. Assignment of Federal service and wages</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8523&num=0&edition=prelim">8523. Dissemination of information</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8524&num=0&edition=prelim">8524. Repealed</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8525&num=0&edition=prelim">8525. Effect on other statutes</a></li>
</ul>

<h5>Chapter 87 — Life Insurance</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8701&num=0&edition=prelim">8701. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8702&num=0&edition=prelim">8702. Automatic coverage</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8703&num=0&edition=prelim">8703. Benefit certificate</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8704&num=0&edition=prelim">8704. Group insurance; amounts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8705&num=0&edition=prelim">8705. Death claims; order of precedence; escheat</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8706&num=0&edition=prelim">8706. Termination of insurance; assignment of ownership</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8707&num=0&edition=prelim">8707. Employee deductions; withholding</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8708&num=0&edition=prelim">8708. Government contributions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8709&num=0&edition=prelim">8709. Insurance policies</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8710&num=0&edition=prelim">8710. Reinsurance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8711&num=0&edition=prelim">8711. Basic tables of premium rates</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8712&num=0&edition=prelim">8712. Annual accounting; special contingency reserve</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8713&num=0&edition=prelim">8713. Effect of other statutes</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8714&num=0&edition=prelim">8714. Employees' Life Insurance Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8714a&num=0&edition=prelim">8714a. Optional insurance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8714b&num=0&edition=prelim">8714b. Additional optional life insurance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8714c&num=0&edition=prelim">8714c. Optional life insurance on family members</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8714d&num=0&edition=prelim">8714d. Option to receive "living benefits"</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8715&num=0&edition=prelim">8715. Jurisdiction of courts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8716&num=0&edition=prelim">8716. Regulations</a></li>
</ul>

<h5>Chapter 89 — Health Insurance</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8901&num=0&edition=prelim">8901. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8902&num=0&edition=prelim">8902. Contracting authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8902a&num=0&edition=prelim">8902a. Debarment and other sanctions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8903&num=0&edition=prelim">8903. Health benefits plans</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8903a&num=0&edition=prelim">8903a. Additional health benefits plans</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8903b&num=0&edition=prelim">8903b. Authority to readmit an employee organization plan</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8903c&num=0&edition=prelim">8903c. Postal Service Health Benefits Program</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8904&num=0&edition=prelim">8904. Types of benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8905&num=0&edition=prelim">8905. Election of coverage</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8905a&num=0&edition=prelim">8905a. Continued coverage</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8906&num=0&edition=prelim">8906. Contributions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8906a&num=0&edition=prelim">8906a. Temporary employees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8907&num=0&edition=prelim">8907. Information to individuals eligible to enroll</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8908&num=0&edition=prelim">8908. Coverage of restored employees and survivor or disability annuitants</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8909&num=0&edition=prelim">8909. Employees Health Benefits Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8909a&num=0&edition=prelim">8909a. Postal Service Retiree Health Benefits Fund</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8910&num=0&edition=prelim">8910. Studies, reports, and audits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8911&num=0&edition=prelim">8911. Advisory committee</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8912&num=0&edition=prelim">8912. Jurisdiction of courts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8913&num=0&edition=prelim">8913. Regulations</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8914&num=0&edition=prelim">8914. Effect of other statutes</a></li>
</ul>

<h5>Chapter 89A — Enhanced Dental Benefits</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8951&num=0&edition=prelim">8951. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8952&num=0&edition=prelim">8952. Availability of dental benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8953&num=0&edition=prelim">8953. Contracting authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8954&num=0&edition=prelim">8954. Benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8955&num=0&edition=prelim">8955. Information to individuals eligible to enroll</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8956&num=0&edition=prelim">8956. Election of coverage</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8957&num=0&edition=prelim">8957. Coverage of restored survivor or disability annuitants</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8958&num=0&edition=prelim">8958. Premiums</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8959&num=0&edition=prelim">8959. Preemption</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8960&num=0&edition=prelim">8960. Studies, reports, and audits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8961&num=0&edition=prelim">8961. Jurisdiction of courts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8962&num=0&edition=prelim">8962. Administrative functions</a></li>
</ul>

<h5>Chapter 89B — Enhanced Vision Benefits</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8981&num=0&edition=prelim">8981. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8982&num=0&edition=prelim">8982. Availability of vision benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8983&num=0&edition=prelim">8983. Contracting authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8984&num=0&edition=prelim">8984. Benefits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8985&num=0&edition=prelim">8985. Information to individuals eligible to enroll</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8986&num=0&edition=prelim">8986. Election of coverage</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8987&num=0&edition=prelim">8987. Coverage of restored survivor or disability annuitants</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8988&num=0&edition=prelim">8988. Premiums</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8989&num=0&edition=prelim">8989. Preemption</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8990&num=0&edition=prelim">8990. Studies, reports, and audits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8991&num=0&edition=prelim">8991. Jurisdiction of courts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8992&num=0&edition=prelim">8992. Administrative functions</a></li>
</ul>

<h5>Chapter 90 — Long-Term Care Insurance</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9001&num=0&edition=prelim">9001. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9002&num=0&edition=prelim">9002. Availability of insurance</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9003&num=0&edition=prelim">9003. Contracting authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9004&num=0&edition=prelim">9004. Financing</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9005&num=0&edition=prelim">9005. Preemption</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9006&num=0&edition=prelim">9006. Studies, reports, and audits</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9007&num=0&edition=prelim">9007. Jurisdiction of courts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9008&num=0&edition=prelim">9008. Administrative functions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9009&num=0&edition=prelim">9009. Cost accounting standards</a></li>
</ul>

<h4>Subpart H — Access to Criminal History Record Information</h4>
<h5>Chapter 91 — Access to Criminal History Records for National Security and Other Purposes</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9101&num=0&edition=prelim">9101. Access to criminal history records for national security and other purposes</a></li>
</ul>

<h5>Chapter 92 — Prohibition on Criminal History Inquiries Prior to Conditional Offer</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9201&num=0&edition=prelim">9201. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9202&num=0&edition=prelim">9202. Limitations on requests for criminal history record information</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9203&num=0&edition=prelim">9203. Agency policies; complaint procedures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9204&num=0&edition=prelim">9204. Adverse action</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9205&num=0&edition=prelim">9205. Procedures</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9206&num=0&edition=prelim">9206. Rules of construction</a></li>
</ul>

<h4>Subpart I — Miscellaneous</h4>
<h5>Chapter 95 — Personnel Flexibilities Relating to the Internal Revenue Service</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9501&num=0&edition=prelim">9501. Internal Revenue Service personnel flexibilities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9502&num=0&edition=prelim">9502. Pay authority for critical positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9503&num=0&edition=prelim">9503. Streamlined critical pay authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9504&num=0&edition=prelim">9504. Recruitment, retention, relocation incentives, and relocation expenses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9505&num=0&edition=prelim">9505. Performance awards for senior executives</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9506&num=0&edition=prelim">9506. Limited appointments to career reserved Senior Executive Service positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9507&num=0&edition=prelim">9507. Streamlined demonstration project authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9508&num=0&edition=prelim">9508. General workforce performance management system</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9509&num=0&edition=prelim">9509. General workforce classification and pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9510&num=0&edition=prelim">9510. General workforce staffing</a></li>
</ul>

<h5>Chapter 96 — Personnel Flexibilities Relating to Land Management Agencies</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9601&num=0&edition=prelim">9601. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9602&num=0&edition=prelim">9602. Competitive service; time-limited appointments</a></li>
</ul>

<h5>Chapter 97 — Department of Homeland Security</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9701&num=0&edition=prelim">9701. Establishment of human resources management system</a></li>
</ul>

<h5>Chapter 98 — National Aeronautics and Space Administration</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9801&num=0&edition=prelim">9801. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9802&num=0&edition=prelim">9802. Planning, notification, and reporting requirements</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9803&num=0&edition=prelim">9803. Restrictions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9804&num=0&edition=prelim">9804. Recruitment, redesignation, and relocation bonuses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9805&num=0&edition=prelim">9805. Retention bonuses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9806&num=0&edition=prelim">9806. Term appointments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9807&num=0&edition=prelim">9807. Pay authority for critical positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9808&num=0&edition=prelim">9808. Assignments of intergovernmental personnel</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9809&num=0&edition=prelim">9809. Science and technology scholarship program</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9810&num=0&edition=prelim">9810. Distinguished scholar appointment authority</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9811&num=0&edition=prelim">9811. Travel and transportation expenses of certain new appointees</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9812&num=0&edition=prelim">9812. Annual leave enhancements</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9813&num=0&edition=prelim">9813. Limited appointments to Senior Executive Service positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9814&num=0&edition=prelim">9814. Qualifications pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9815&num=0&edition=prelim">9815. Reporting requirement</a></li>
</ul>

<h5>Chapter 99 — Department of Defense Personnel Authorities</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9901&num=0&edition=prelim">9901. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9902&num=0&edition=prelim">9902. Department of Defense personnel authorities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9903&num=0&edition=prelim">9903. Attracting highly qualified experts</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9904&num=0&edition=prelim">9904. Special pay and benefits for certain employees outside the United States</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section9905&num=0&edition=prelim">9905. Direct hire authority for certain personnel of the Department of Defense</a></li>
</ul>

<h5>Chapter 101 — Federal Emergency Management Agency Personnel</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10101&num=0&edition=prelim">10101. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10102&num=0&edition=prelim">10102. Strategic human capital plan</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10103&num=0&edition=prelim">10103. Career paths</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10104&num=0&edition=prelim">10104. Recruitment bonuses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10105&num=0&edition=prelim">10105. Retention bonuses</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10106&num=0&edition=prelim">10106. Quarterly report on vacancy rate in employee positions</a></li>
</ul>

<h5>Chapter 102 — United States Secret Service Uniformed Division Personnel</h5>
<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10201&num=0&edition=prelim">10201. Definitions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10202&num=0&edition=prelim">10202. Authorities</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10203&num=0&edition=prelim">10203. Basic pay</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10204&num=0&edition=prelim">10204. Rate of pay for original appointments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10205&num=0&edition=prelim">10205. Service step adjustments</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10206&num=0&edition=prelim">10206. Technician positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10207&num=0&edition=prelim">10207. Promotions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10208&num=0&edition=prelim">10208. Demotions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10209&num=0&edition=prelim">10209. Clothing allowances</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10210&num=0&edition=prelim">10210. Reporting requirement</a></li>
</ul>

<h5>Chapter 103 — Department of State</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10301&num=0&edition=prelim">10301. Notice of employment opportunities for Department of State and USAID positions</a></li>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section10302&num=0&edition=prelim">10302. Consulting services for the Department of State</a></li>
</ul>

<h4>Subpart J — Enhanced Personnel Security Programs</h4>
<h5>Chapter 110 — Enhanced Personnel Security Programs</h5>

<ul>
  <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section11001&num=0&edition=prelim">11001. Enhanced personnel security programs</a></li>
</ul>

                    </div>
                </div>
            </div>
        </div>
    </body>
</template>
