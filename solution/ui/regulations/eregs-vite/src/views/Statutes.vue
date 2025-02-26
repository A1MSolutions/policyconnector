<script setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import SimpleSpinner from "eregsComponentLib/src/components/SimpleSpinner.vue";

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
            </Banner>
            <div id="main-content" class="statute__container">
                <div class="content">

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
    <li><a href="https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section2307&num=0&edition=prelim">2307. [Repealed.]</a></li>
</ul>



                </div>
            </div>
        </div>
    </body>
</template>
