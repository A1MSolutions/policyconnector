<script setup>
import { inject } from "vue";

import AccessLink from "@/components/AccessLink.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import HeaderLinks from "@/components/header/HeaderLinks.vue";
import HeaderSearch from "@/components/header/HeaderSearch.vue";
import JumpTo from "@/components/JumpTo.vue";
import HeaderUserWidget from "@/components/header/HeaderUserWidget.vue";

const adminUrl = inject("adminUrl");
const apiUrl = inject("apiUrl");
const homeUrl = inject("homeUrl");
const isAuthenticated = inject("isAuthenticated");
const searchUrl = inject("searchUrl");
const subjectsUrl = inject("subjectsUrl");
const username = inject("username");

const getStatuteUrl = (sectionNumber) =>
    `https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section${sectionNumber}&num=0&edition=prelim`;

/*
Some sections have a letter at the end of the section number, such as 2101a.
Two sections have a dash in the section number: 3598-1 and 5757-1.
Some sections are [Repealed], [Renumbered], or [Omitted]. 5591-5594 is non-standard.
*/
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
            <div id="main-content" class="statute__container">
                <div class="content">
                    <div>
                        <h1>Look Up Statutes</h1>

                        <p>
                            Quick links to federal employment laws, for convenient reference.
                        </p>

                        <h2>OPM Indexes of Laws and Regulations</h2>

                        <ul style="padding-bottom:24px">
                            <li>
                                <a
                                    href="https://www.opm.gov/policy-data-oversight/pay-leave/leave-administration/#url=Reference-Materials"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Leave
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.opm.gov/policy-data-oversight/pay-leave/pay-administration/fact-sheets/laws-regulations-and-other-references-related-to-pay-administration/"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Pay Administration
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.opm.gov/policy-data-oversight/performance-management/legal-citations/"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Performance Management
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.opm.gov/policy-data-oversight/senior-executive-service/ses-desk-guide/statutes-regulations-and-desk-guide-citations/"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.opm.gov/wiki/training/Training-Administration-Fast-Facts-Index.ashx"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Training and Development
                                </a>
                            </li>
                        </ul>

                        <h2>U.S.C. Title 5 — Government Organization and Employees, Part III — Employees</h2>

                        <p>
                            Excerpted from
                            <a 
                                href="https://uscode.house.gov/browse/prelim@title5&edition=prelim"
                                class="external"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                5 U.S.C. on the House U.S. Code website</a>.
                        </p>

                        <h4>Subpart A — General Provisions</h4>

                        <h5>Chapter 21 — Definitions</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('2101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2101.</span> 
                                    Civil service; armed forces; uniformed services
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2101a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2101a.</span> 
                                    The Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2102.</span> 
                                    The competitive service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2103.</span> 
                                    The excepted service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2104.</span> 
                                    Officer
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2105.</span> 
                                    Employee
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2106.</span> 
                                    Member of Congress
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2107')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2107.</span> 
                                    Congressional employee
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2108')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2108.</span> 
                                    Veteran; disabled veteran; preference eligible
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2108a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2108a.</span> 
                                    Treatment of certain individuals as veterans, disabled veterans, and preference eligibles
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2109')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2109.</span> 
                                    Air traffic controller; Secretary
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 23 — Merit System Principles</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('2301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2301.</span> 
                                    Merit system principles
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2302')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2302.</span> 
                                    Prohibited personnel practices
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2303')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2303.</span> 
                                    Prohibited personnel practices in the Federal Bureau of Investigation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2304')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2304.</span> 
                                    Prohibited personnel practices affecting the Transportation Security Administration
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2305')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2305.</span> 
                                    Responsibility of the Government Accountability Office
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2306')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2306.</span> 
                                    Coordination with certain other provisions of law
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2307')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2307.</span> 
                                    [Repealed]
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 29 — Commissions, Oaths, Records, and Reports</h5>
                        <h6>Subchapter I — Commissions, Oaths, and Records</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('2901')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2901.</span> 
                                    Commission of an officer
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2902')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2902.</span> 
                                    Commission; where recorded
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2903')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2903.</span> 
                                    Oath; authority to administer
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2904')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2904.</span> 
                                    Oath; administered without fees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2905')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2905.</span> 
                                    Oath; renewal
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2906')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2906.</span> 
                                    Oath; custody
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Reports</h6>


                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('2951')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2951.</span> 
                                    Reports to the Office of Personnel Management
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2952')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2952.</span> 
                                    Time of making annual reports
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2953')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2953.</span> 
                                    Reports to Congress on additional employee requirements
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('2954')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">2954.</span> 
                                    Information to committees of Congress on request
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart B — Employment and Retention</h4>
                        <h5>Chapter 31 — Authority for Employment</h5>
                        <h6>Subchapter I — Employment Authorities</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3101.</span> 
                                    General authority to employ
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3102.</span> 
                                    Employment of personal assistants for handicapped employees, including blind and deaf employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3103.</span> 
                                    Employment at seat of Government only for services rendered
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3104.</span> 
                                    Employment of specially qualified scientific and professional personnel
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3105.</span> 
                                    Appointment of administrative law judges
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3106.</span> 
                                    Employment of attorneys; restrictions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3107')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3107.</span> 
                                    Employment of publicity experts; restrictions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3108')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3108.</span> 
                                    Employment of detective agencies; restrictions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3109')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3109.</span> 
                                    Employment of experts and consultants; temporary or intermittent
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3110')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3110.</span> 
                                    Employment of relatives; restrictions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3111')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3111.</span> 
                                    Acceptance of volunteer service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3111a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3111a.</span> 
                                    Federal internship programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3112')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3112.</span> 
                                    Disabled veterans; noncompetitive appointment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3113')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3113.</span> 
                                    Restriction on reemployment after conviction of certain crimes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3114')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3114.</span> 
                                    Appointment of candidates to positions in the competitive service by the Securities and Exchange Commission
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3115')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3115.</span> 
                                    Expedited hiring authority for college graduates; competitive service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3116')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3116.</span> 
                                    Expedited hiring authority for post-secondary students; competitive service
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — The Senior Executive Service</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3131')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3131.</span> 
                                    The Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3132')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3132.</span> 
                                    Definitions and exclusions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3133')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3133.</span> 
                                    Authorization of positions; authority for appointment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3134')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3134.</span> 
                                    Limitations on noncareer and limited appointments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3135')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3135.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3136')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3136.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — The Federal Bureau of Investigation and Drug Enforcement Administration Senior Executive Service</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3151')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3151.</span> 
                                    The Federal Bureau of Investigation and Drug Enforcement Administration Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3152')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3152.</span> 
                                    Limitation on pay
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Temporary Organizations Established by Law or Executive Order</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3161')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3161.</span> 
                                    Employment and compensation of employees
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Presidential Innovation Fellows Program</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3171')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3171.</span> 
                                    Presidential Innovation Fellows Program
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3172')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3172.</span> 
                                    Presidential Innovation Fellows Program Advisory Board
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 33 — Examination, Selection, and Placement</h5>
                        <h6>Subchapter I — Examination, Certification, and Appointment</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3301.</span> 
                                    Civil service; generally
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3302')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3302.</span> 
                                    Competitive service; rules
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3303')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3303.</span> 
                                    Competitive service; recommendations of Senators or Representatives
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3304')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3304.</span> 
                                    Competitive service; examinations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3304a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3304a.</span> 
                                    Competitive service; career appointment after 3 years' temporary service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3305')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3305.</span> 
                                    Competitive service; examinations; when held
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3306')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3306.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3307')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3307.</span> 
                                    Competitive service; maximum-age entrance requirements; exceptions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3308')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3308.</span> 
                                    Competitive service; examinations; educational requirements prohibited; exceptions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3309')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3309.</span> 
                                    Preference eligibles; examinations; additional points for
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3310')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3310.</span> 
                                    Preference eligibles; examinations; guards, elevator operators, messengers, and custodians
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3311')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3311.</span> 
                                    Preference eligibles; examinations; crediting experience
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3312')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3312.</span> 
                                    Preference eligibles; physical qualifications; waiver
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3313')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3313.</span> 
                                    Competitive service; registers of eligibles
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3314')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3314.</span> 
                                    Registers; preference eligibles who resigned
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3315')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3315.</span> 
                                    Registers; preference eligibles furloughed or separated
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3315a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3315a.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3316')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3316.</span> 
                                    Preference eligibles; reinstatement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3317')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3317.</span> 
                                    Competitive service; certification from registers
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3318')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3318.</span> 
                                    Competitive service; selection from certificates
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3319')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3319.</span> 
                                    Alternative ranking and selection procedures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3320')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3320.</span> 
                                    Excepted service; government of the District of Columbia; selection
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3321')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3321.</span> 
                                    Competitive service; probationary period
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3322')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3322.</span> 
                                    Voluntary separation before resolution of personnel investigation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3323')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3323.</span> 
                                    Automatic separations; reappointment; reemployment of annuitants
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3324')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3324.</span> 
                                    Appointments to positions classified above GS–15
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3325')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3325.</span> 
                                    Appointments to scientific and professional positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3326')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3326.</span> 
                                    Appointments of retired members of the armed forces to positions in the Department of Defense
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3327')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3327.</span> 
                                    Civil service employment information
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3328')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3328.</span> 
                                    Selective Service registration
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3329')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3329.</span> 
                                    Appointments of military reserve technicians to positions in the competitive service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3330')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3330.</span> 
                                    Government-wide list of vacant positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3330a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3330a.</span> 
                                    Preference eligibles; administrative redress
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3330b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3330b.</span> 
                                    Preference eligibles; judicial redress
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3330c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3330c.</span> 
                                    Preference eligibles; remedy
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3330d')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3330d.</span> 
                                    Appointment of military and Department of Defense civilian spouses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3330e')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3330e.</span> 
                                    Review of official personnel file of former Federal employees before rehiring
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3330f')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3330f.</span> 
                                    Government policy and supporting position data
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Oath of Office</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3331')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3331.</span> 
                                    Oath of office
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3332')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3332.</span> 
                                    Officer affidavit; no consideration paid for appointment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3333')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3333.</span> 
                                    Employee affidavit; loyalty and striking against the Government
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Details, Vacancies, and Appointments</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3341')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3341.</span> 
                                    Details; within Executive or military departments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3342')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3342.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3343')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3343.</span> 
                                    Details; to international organizations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3344')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3344.</span> 
                                    Details; administrative law judges
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3345')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3345.</span> 
                                    Acting officer
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3346')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3346.</span> 
                                    Time limitation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3347')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3347.</span> 
                                    Exclusivity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3348')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3348.</span> 
                                    Vacant office
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3349')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3349.</span> 
                                    Reporting of vacancies
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3349a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3349a.</span> 
                                    Presidential inaugural transitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3349b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3349b.</span> 
                                    Holdover provisions relating to certain independent establishments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3349c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3349c.</span> 
                                    Exclusion of certain officers
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3349d')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3349d.</span> 
                                    Notification of intent to nominate during certain recesses or adjournments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3349e')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3349e.</span> 
                                    Presidential explanation of failure to nominate an Inspector General
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Transfers</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3351')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3351.</span> 
                                    Preference eligibles; transfer; physical qualifications; waiver
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3352')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3352.</span> 
                                    Preference in transfers for employees making certain disclosures
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Promotion</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3361')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3361.</span> 
                                    Promotion; competitive service; examination
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3362')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3362.</span> 
                                    Promotion; effect of incentive award
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3363')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3363.</span> 
                                    Preference eligibles; promotion; physical qualifications; waiver
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3364')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3364.</span> 
                                    [Repealed]
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VI — Assignments to and From States</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3371')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3371.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3372')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3372.</span> 
                                    General provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3373')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3373.</span> 
                                    Assignments of employees to State or local governments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3374')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3374.</span> 
                                    Assignments of employees from State or local governments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3375')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3375.</span> 
                                    Travel expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3376')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3376.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VII — Air Traffic Controllers</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3381')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3381.</span> 
                                    Training
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3382')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3382.</span> 
                                    Involuntary separation for retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3383')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3383.</span> 
                                    Determinations; review procedures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3384')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3384.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3385')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3385.</span> 
                                    Effect on other authority
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VIII — Appointment, Reassignment, Transfer, and Development in the Senior Executive Service</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3391')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3391.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3392')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3392.</span> 
                                    General appointment provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3393')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3393.</span> 
                                    Career appointments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3393a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3393a.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3394')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3394.</span> 
                                    Noncareer and limited appointments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3395')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3395.</span> 
                                    Reassignment and transfer within the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3396')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3396.</span> 
                                    Development for and within the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3397')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3397.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 34 — Part-Time Career Employment Opportunities</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3401')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3401.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3402')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3402.</span> 
                                    Establishment of part-time career employment programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3403')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3403.</span> 
                                    Limitations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3404')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3404.</span> 
                                    Personnel ceilings
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3405')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3405.</span> 
                                    Nonapplicability
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3406')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3406.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3407')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3407.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3408')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3408.</span> 
                                    Employee organization representation
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 35 — Retention Preference, Voluntary Separation Incentive Payments, Restoration, and Reemployment</h5>
                        <h6>Subchapter I — Retention Preference</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3501')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3501.</span> 
                                    Definitions; application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3502')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3502.</span> 
                                    Order of retention
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3503')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3503.</span> 
                                    Transfer of functions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3504')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3504.</span> 
                                    Preference eligibles; retention; physical qualifications; waiver
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Voluntary Separation Incentive Payments</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3521')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3521.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3522')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3522.</span> 
                                    Agency plans; approval
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3523')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3523.</span> 
                                    Authority to provide voluntary separation incentive payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3524')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3524.</span> 
                                    Effect of subsequent employment with the Government
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3525')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3525.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Reinstatement or Restoration After Suspension or Removal for National Security</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3571')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3571.</span> 
                                    Reinstatement or restoration; individuals suspended or removed for national security
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Reemployment After Service With an International Organization</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3581')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3581.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3582')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3582.</span> 
                                    Rights of transferring employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3583')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3583.</span> 
                                    Computations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3584')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3584.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Removal, Reinstatement, and Guaranteed Placement in the Senior Executive Service</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3591')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3591.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3592')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3592.</span> 
                                    Removal from the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3593')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3593.</span> 
                                    Reinstatement in the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3594')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3594.</span> 
                                    Guaranteed placement in other personnel systems
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3595')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3595.</span> 
                                    Reduction in force in the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3595a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3595a.</span> 
                                    Furlough in the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3596')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3596.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VI — Reemployment Following Limited Appointment in the Foreign Service</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3597')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3597.</span> 
                                    Reemployment following limited appointment in the Foreign Service
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VII — Retention of Retired Specialized Employees at the Federal Bureau of Investigation</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3598')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3598.</span> 
                                    Federal Bureau of Investigation reserve service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3598-1')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3598.</span>
                                    Federal Bureau of Investigation Reserve Service
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 37 — Information Technology Exchange Program</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('3701')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3701.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3702')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3702.</span> 
                                    General provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3703')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3703.</span> 
                                    Assignment of employees to private sector organizations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3704')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3704.</span> 
                                    Assignment of employees from private sector organizations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3705')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3705.</span> 
                                    Application to Office of the Chief Technology Officer of the District of Columbia
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3706')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3706.</span> 
                                    Reporting requirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('3707')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">3707.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart C — Employee Performance</h4>
                        <h5>Chapter 41 — Training</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4101.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4102.</span> 
                                    Exceptions; Presidential authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4103.</span> 
                                    Establishment of training programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4104.</span> 
                                    Government facilities; use of
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4105.</span> 
                                    Non-Government facilities; use of
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4106.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4107')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4107.</span> 
                                    Academic degree training
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4108')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4108.</span> 
                                    Employee agreements; service after training
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4109')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4109.</span> 
                                    Expenses of training
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4110')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4110.</span> 
                                    Expenses of attendance at meetings
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4111')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4111.</span> 
                                    Acceptance of contributions, awards, and other payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4112')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4112.</span> 
                                    Absorption of costs within funds available
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4113')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4113.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4114')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4114.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4115')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4115.</span> 
                                    Collection of training information
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4116')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4116.</span> 
                                    Training program assistance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4117')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4117.</span> 
                                    Administration
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4118')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4118.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4119')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4119.</span> 
                                    Training for employees under the Office of the Architect of the Capitol and the Botanic Garden
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4120')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4120.</span> 
                                    Training for employees of the Capitol Police
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4121')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4121.</span> 
                                    Specific training programs
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 43 — Performance Appraisal</h5>
                        <h6>Subchapter I — General Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4301.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4302')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4302.</span> 
                                    Establishment of performance appraisal systems
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4302a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4302a.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4303')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4303.</span> 
                                    Actions based on unacceptable performance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4304')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4304.</span> 
                                    Responsibilities of Office of Personnel Management
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4305')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4305.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Performance Appraisal in the Senior Executive Service</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4311')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4311.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4312')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4312.</span> 
                                    Senior Executive Service performance appraisal systems
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4313')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4313.</span> 
                                    Criteria for performance appraisals
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4314')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4314.</span> 
                                    Ratings for performance appraisals
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4315')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4315.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 45 — Incentive Awards</h5>
                        <h6>Subchapter I — Awards for Superior Accomplishments</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4501')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4501.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4502')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4502.</span> 
                                    General provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4503')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4503.</span> 
                                    Agency awards
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4504')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4504.</span> 
                                    Presidential awards
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4505')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4505.</span> 
                                    Awards to former employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4505a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4505a.</span> 
                                    Performance-based cash awards
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4506')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4506.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4507')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4507.</span> 
                                    Awarding of Ranks in the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4507a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4507a.</span> 
                                    Awarding of ranks to other senior career employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4508')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4508.</span> 
                                    Limitation of awards during a Presidential election year
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4509')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4509.</span> 
                                    Prohibition of cash award to Executive Schedule officers
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Awards for Cost Savings Disclosures</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4511')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4511.</span> 
                                    Definition and general provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4512')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4512.</span> 
                                    Agency awards for cost savings disclosures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4513')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4513.</span> 
                                    Presidential awards for cost savings disclosures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4513')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4514.</span> 
                                    [Repealed]
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Awards to Law Enforcement Officers for Foreign Language Capabilities</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4521')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4521.</span> 
                                    Definition
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4522')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4522.</span> 
                                    General provision
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4523')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4523.</span> 
                                    Award authority
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 47 — Personnel Research Programs and Demonstration Projects</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4701')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4701.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4702')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4702.</span> 
                                    Research programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4703')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4703.</span> 
                                    Demonstration projects
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4704')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4704.</span> 
                                    Allocation of funds
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4705')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4705.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4706')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4706.</span> 
                                    [Renumbered]
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 48 — Agency Personnel Demonstration Project</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('4801')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4801.</span> 
                                    Nonapplicability of chapter 47
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('4802')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">4802.</span> 
                                    Securities and Exchange Commission
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart D — Pay and Allowances</h4>
                        <h5>Chapter 51 — Classification</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5101.</span> 
                                    Purpose
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5102.</span> 
                                    Definitions; application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5103.</span> 
                                    Determination of applicability
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5104.</span> 
                                    Basis for grading positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5105.</span> 
                                    Standards for classification of positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5106.</span> 
                                    Basis for classifying positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5107')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5107.</span> 
                                    Classification of positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5108')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5108.</span> 
                                    Classification of positions above GS–15
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5109')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5109.</span> 
                                    Positions classified by statute
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5110')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5110.</span> 
                                    Review of classification of positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5111')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5111.</span> 
                                    Revocation and restoration of authority to classify positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5112')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5112.</span> 
                                    General authority of the Office of Personnel Management
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5113')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5113.</span> 
                                    Classification records
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5114')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5114.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5115')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5115.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 53 — Pay Rates and Systems</h5>
                        <h6>Subchapter I — Pay Comparability System</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5301.</span> 
                                    Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5302')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5302.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5303')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5303.</span> 
                                    Annual adjustments to pay schedules
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5304')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5304.</span> 
                                    Locality-based comparability payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5304a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5304a.</span> 
                                    Authority to fix an alternative level of comparability payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5305')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5305.</span> 
                                    Special pay authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5306')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5306.</span> 
                                    Pay fixed by administrative action
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5307')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5307.</span> 
                                    Limitation on certain payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5308')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5308.</span> 
                                    [Omitted]
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Executive Schedule Pay Rates</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5311')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5311.</span> 
                                    The Executive Schedule
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5312')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5312.</span> 
                                    Positions at level I
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5313')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5313.</span> 
                                    Positions at level II
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5314')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5314.</span> 
                                    Positions at level III
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5315')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5315.</span> 
                                    Positions at level IV
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5316')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5316.</span> 
                                    Positions at level V
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5317')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5317.</span> 
                                    Presidential authority to place positions at levels IV and V
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5318')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5318.</span> 
                                    Adjustments in rates of pay
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — General Schedule Pay Rates</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5331')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5331.</span> 
                                    Definitions; application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5332')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5332.</span> 
                                    The General Schedule
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5333')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5333.</span> 
                                    Minimum rate for new appointments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5334')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5334.</span> 
                                    Rate on change of position or type of appointment; regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5335')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5335.</span> 
                                    Periodic step-increases
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5336')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5336.</span> 
                                    Additional step-increases
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5337')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5337.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5338')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5338.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Prevailing Rate Systems</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5341')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5341.</span> 
                                    Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5342')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5342.</span> 
                                    Definitions; application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5343')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5343.</span> 
                                    Prevailing rate determinations; wage schedules; night differentials
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5344')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5344.</span> 
                                    Effective date of wage increase; retroactive pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5345')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5345.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5346')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5346.</span> 
                                    Job grading system
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5347')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5347.</span> 
                                    Federal Prevailing Rate Advisory Committee
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5348')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5348.</span> 
                                    Crews of vessels
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5349')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5349.</span> 
                                    Prevailing rate employees; legislative, judicial, Bureau of Engraving and Printing, and government of the District of Columbia
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Student-Employees</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5351')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5351.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5352')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5352.</span> 
                                    Stipends
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5353')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5353.</span> 
                                    Quarters, subsistence, and laundry
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5354')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5354.</span> 
                                    Effect of detail or affiliation; travel expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5355')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5355.</span> 
                                    Effect on other statutes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5356')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5356.</span> 
                                    Appropriations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VI — Grade and Pay Retention</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5361')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5361.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5362')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5362.</span> 
                                    Grade retention following a change of positions or reclassification
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5363')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5363.</span> 
                                    Pay retention
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5364')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5364.</span> 
                                    Remedial actions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5365')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5365.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5366')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5366.</span> 
                                    Appeals
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VII — Miscellaneous Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5371')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5371.</span> 
                                    Health care positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5372')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5372.</span> 
                                    Administrative law judges
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5372a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5372a.</span> 
                                    Contract appeals board members
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5372b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5372b.</span> 
                                    Administrative appeals judges
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5373')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5373.</span> 
                                    Limitation on pay fixed by administrative action
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5374')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5374.</span> 
                                    Miscellaneous positions in the executive branch
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5375')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5375.</span> 
                                    Police force of the National Zoological Park
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5376')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5376.</span> 
                                    Pay for certain senior-level positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5377')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5377.</span> 
                                    Pay authority for critical positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5378')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5378.</span> 
                                    Police forces of the Bureau of Engraving and Printing and the United States Mint
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5379')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5379.</span> 
                                    Student loan repayments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5380')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5380.</span> 
                                    Repealed
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VIII — Pay for the Senior Executive Service</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5381')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5381.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5382')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5382.</span> 
                                    Establishment and adjustment of rates of pay for the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5383')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5383.</span> 
                                    Setting individual senior executive pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5384')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5384.</span> 
                                    Performance awards in the Senior Executive Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5385')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5385.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IX — Special Occupational Pay Systems</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5391')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5391.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5392')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5392.</span> 
                                    Establishment of special occupational pay systems
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 54 — Human Capital Performance Fund</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5401')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5401.</span> 
                                    Purpose
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5402')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5402.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5403')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5403.</span> 
                                    Human Capital Performance Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5404')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5404.</span> 
                                    Human capital performance payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5405')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5405.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5406')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5406.</span> 
                                    Agency plan
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5407')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5407.</span> 
                                    Nature of payment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5408')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5408.</span> 
                                    Appropriations
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 55 — Pay Administration</h5>
                        <h6>Subchapter I — General Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5501')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5501.</span> 
                                    Disposition of money accruing from lapsed salaries or unused appropriations for salaries
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5502')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5502.</span> 
                                    Unauthorized office; prohibition on use of funds
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5503')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5503.</span> 
                                    Recess appointments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5504')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5504.</span> 
                                    Biweekly pay periods; computation of pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5505')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5505.</span> 
                                    Monthly pay periods; computation of pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5506')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5506.</span> 
                                    Computation of extra pay based on standard or daylight saving time
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5507')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5507.</span> 
                                    Officer affidavit; condition to pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5508')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5508.</span> 
                                    Officer entitled to leave; effect on pay status
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5509')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5509.</span> 
                                    Appropriations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Withholding Pay</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5511')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5511.</span> 
                                    Withholding pay; employees removed for cause
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5512')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5512.</span> 
                                    Withholding pay; individuals in arrears
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5513')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5513.</span> 
                                    Withholding pay; credit disallowed or charge raised for payment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5514')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5514.</span> 
                                    Installment deduction for indebtedness because of erroneous payment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5515')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5515.</span> 
                                    Crediting amounts received for jury or witness service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5516')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5516.</span> 
                                    Withholding District of Columbia income taxes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5517')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5517.</span> 
                                    Withholding State income taxes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5518')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5518.</span> 
                                    Deductions for State retirement systems; National Guard employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5519')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5519.</span> 
                                    Crediting amounts received for certain Reserve or National Guard service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5520')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5520.</span> 
                                    Withholding of city or county income or employment taxes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5520a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5520a.</span> 
                                    Garnishment of pay
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Advancement, Allotment, and Assignment of Pay</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5521')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5521.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5522')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5522.</span> 
                                    Advance payments; rates; amounts recoverable
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5523')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5523.</span> 
                                    Duration of payments; rates; active service period
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5524')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5524.</span> 
                                    Review of accounts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5524a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5524a.</span> 
                                    Advance payments for new appointees and employees relocating within the United States and its territories
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5525')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5525.</span> 
                                    Allotment and assignment of pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5526')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5526.</span> 
                                    Funds available on reimbursable basis
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5527')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5527.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Dual Pay and Dual Employment</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5531')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5531.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5532')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5532.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5533')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5533.</span> 
                                    Dual pay from more than one position; limitations; exceptions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5534')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5534.</span> 
                                    Dual employment and pay of Reserves and National Guardsmen
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5534a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5534a.</span> 
                                    Dual employment and pay during terminal leave from uniformed services
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5535')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5535.</span> 
                                    Extra pay for details prohibited
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5536')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5536.</span> 
                                    Extra pay for extra services prohibited
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5537')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5537.</span> 
                                    Fees for jury and witness service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5538')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5538.</span> 
                                    Nonreduction in pay while serving in the uniformed services or National Guard
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Premium Pay</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5541')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5541.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5542')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5542.</span> 
                                    Overtime rates; computation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5543')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5543.</span> 
                                    Compensatory time off
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5544')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5544.</span> 
                                    Wage-board overtime and Sunday rates; computation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5545')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5545.</span> 
                                    Night, standby, irregular, and hazardous duty differential
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5545a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5545a.</span> 
                                    Availability pay for criminal investigators
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5545b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5545b.</span> 
                                    Pay for firefighters
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5546')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5546.</span> 
                                    Pay for Sunday and holiday work
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5546a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5546a.</span> 
                                    Differential pay for certain employees of the Federal Aviation Administration and the Department of Defense
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5547')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5547.</span> 
                                    Limitation on premium pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5548')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5548.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5549')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5549.</span> 
                                    Effect on other statutes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5550')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5550.</span> 
                                    Border patrol rate of pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5550a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5550a.</span> 
                                    Compensatory time off for religious observances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5550b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5550b.</span> 
                                    Compensatory time off for travel
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VI — Payment for Accumulated and Accrued Leave</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5551')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5551.</span> 
                                    Lump-sum payment for accumulated and accrued leave on separation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5552')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5552.</span> 
                                    Lump-sum payment for accumulated and accrued leave on entering active duty; election
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5553')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5553.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VII — Payments to Missing Employees</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5561')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5561.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5562')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5562.</span> 
                                    Pay and allowances; continuance while in a missing status; limitations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5563')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5563.</span> 
                                    Allotments; continuance, suspension, initiation, resumption, or increase while in a missing status; limitations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5564')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5564.</span> 
                                    Travel and transportation; dependents; household and personal effects; motor vehicles; sale of bulky items; claims for proceeds; appropriation chargeable
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5565')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5565.</span> 
                                    Agency review
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5566')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5566.</span> 
                                    Agency determinations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5567')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5567.</span> 
                                    Settlement of accounts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5568')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5568.</span> 
                                    Income tax deferment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5569')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5569.</span> 
                                    Benefits for captives
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5570')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5570.</span> 
                                    Compensation for disability or death
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VIII — Settlement of Accounts</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5581')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5581.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5582')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5582.</span> 
                                    Designation of beneficiary; order of precedence
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5583')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5583.</span> 
                                    Payment of money due; settlement of accounts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5584')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5584.</span> 
                                    Claims for overpayment of pay and allowances, and of travel, transportation and relocation expenses and allowances
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IX — Severance Pay and Back Pay</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5591')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5591 to 5594.</span>
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5595')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5595.</span> 
                                    Severance pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5596')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5596.</span> 
                                    Back pay due to unjustified personnel action
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5597')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5597.</span> 
                                    Separation pay
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 57 — Travel, Transportation, and Subsistence</h5>
                        <h6>Subchapter I — Travel and Subsistence Expenses; Mileage Allowances</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5701')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5701.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5702')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5702.</span> 
                                    Per diem; employees traveling on official business
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5703')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5703.</span> 
                                    Per diem, travel, and transportation expenses; experts and consultants; individuals serving without pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5704')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5704.</span> 
                                    Mileage and related allowances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5705')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5705.</span> 
                                    Advancements and deductions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5706')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5706.</span> 
                                    Allowable travel expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5706a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5706a.</span> 
                                    Subsistence and travel expenses for threatened law enforcement personnel
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5706b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5706b.</span> 
                                    Interview expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5706c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5706c.</span> 
                                    Reimbursement for taxes incurred on money received for travel expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5707')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5707.</span> 
                                    Regulations and reports
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5707a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5707a.</span> 
                                    Adherence to fire safety guidelines in establishing rates and discounts for lodging expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5708')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5708.</span> 
                                    Effect on other statutes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5709')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5709.</span> 
                                    Air evacuation patients: furnished subsistence
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5710')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5710.</span> 
                                    Authority for travel expenses test programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5711')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5711.</span> 
                                    Authority for telework travel expenses programs
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Travel and Transportation Expenses; New Appointees, Student Trainees, and Transferred Employees</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5721')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5721.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5722')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5722.</span> 
                                    Travel and transportation expenses of new appointees; posts of duty outside the continental United States
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5723')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5723.</span> 
                                    Travel and transportation expenses of new appointees and student trainees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5724')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5724.</span> 
                                    Travel and transportation expenses of employees transferred; advancement of funds; reimbursement on commuted basis
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5724a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5724a.</span> 
                                    Relocation expenses of employees transferred or reemployed
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5724b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5724b.</span> 
                                    Taxes on reimbursements for travel, transportation, and relocation expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5724c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5724c.</span> 
                                    Relocation services
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5724d')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5724d.</span> 
                                    Transportation and moving expenses for immediate family of certain deceased Federal employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5725')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5725.</span> 
                                    Transportation expenses; employees assigned to danger areas
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5726')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5726.</span> 
                                    Storage expenses; household goods and personal effects
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5727')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5727.</span> 
                                    Transportation of motor vehicles
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5728')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5728.</span> 
                                    Travel and transportation expenses; vacation leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5729')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5729.</span> 
                                    Transportation expenses; prior return of family
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5730')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5730.</span> 
                                    Funds available
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5731')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5731.</span> 
                                    Expenses limited to lowest first-class rate
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5732')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5732.</span> 
                                    General average contribution; payment or reimbursement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5733')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5733.</span> 
                                    Expeditious travel
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5734')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5734.</span> 
                                    Travel, transportation, and relocation expenses of employees transferred from the Postal Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5735')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5735.</span> 
                                    Travel, transportation, and relocation expenses of employees transferring to the United States Postal Service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5736')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5736.</span> 
                                    Travel, transportation, and relocation expenses of certain nonappropriated fund employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5737')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5737.</span> 
                                    Relocation expenses of an employee who is performing an extended assignment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5737a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5737a.</span> 
                                    Employees temporarily deployed in contingency operations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5738')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5738.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5739')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5739.</span> 
                                    Authority for relocation expenses test programs
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Transportation of Remains, Dependents, and Effects</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5741')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5741.</span> 
                                    General prohibition
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5742')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5742.</span> 
                                    Transportation of remains, dependents, and effects; death occurring away from official station or abroad
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Miscellaneous Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5751')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5751.</span> 
                                    Travel expenses of witnesses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5752')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5752.</span> 
                                    Travel expenses of Senior Executive Service candidates
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5753')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5753.</span> 
                                    Recruitment and relocation bonuses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5754')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5754.</span> 
                                    Retention bonuses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5755')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5755.</span> 
                                    Supervisory differentials
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5756')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5756.</span> 
                                    Home marketing incentive payment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5757')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5757.</span> 
                                    Payment of expenses to obtain professional credentials
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5757-1')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5757.</span>
                                    Extended assignment incentive
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5759')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5759.</span> 
                                    Retention and relocation bonuses for the Federal Bureau of Investigation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5760')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5760.</span> 
                                    Travel and transportation allowances: transportation of family members incident to the repatriation of employees held captive
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5761')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5761.</span> 
                                    Foreign language proficiency pay awards for the Federal Bureau of Investigation
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 59 — Allowances</h5>
                        <h6>Subchapter I — Uniforms</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5901')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5901.</span> 
                                    Uniform allowances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5902')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5902.</span> 
                                    Increase in maximum uniform allowance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5903')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5903.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Quarters</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5911')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5911.</span> 
                                    Quarters and facilities; employees in the United States
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5912')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5912.</span> 
                                    Quarters in Government owned or rented buildings; employees in foreign countries
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5913')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5913.</span> 
                                    Official residence expenses
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Overseas Differentials and Allowances</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5921')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5921.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5922')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5922.</span> 
                                    General provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5923')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5923.</span> 
                                    Quarters allowances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5924')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5924.</span> 
                                    Cost-of-living allowances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5925')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5925.</span> 
                                    Post differentials
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5926')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5926.</span> 
                                    Compensatory time off at certain posts in foreign areas
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5927')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5927.</span> 
                                    Advances of pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5928')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5928.</span> 
                                    Danger pay allowance
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Miscellaneous Allowances</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('5941')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5941.</span> 
                                    Allowances based on living costs and conditions of environment; employees stationed outside continental United States or in Alaska
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5942')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5942.</span> 
                                    Allowance based on duty at remote worksites
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5942a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5942a.</span> 
                                    Separate maintenance allowance for duty at Johnston Island
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5943')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5943.</span> 
                                    Foreign currency appreciation allowances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5944')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5944.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5945')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5945.</span> 
                                    Notary public commission expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5946')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5946.</span> 
                                    Membership fees; expenses of attendance at meetings; limitations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5947')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5947.</span> 
                                    Quarters, subsistence, and allowances for employees of the Corps of Engineers, Department of the Army, engaged in floating plant operations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5948')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5948.</span> 
                                    Physicians comparability allowances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('5949')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">5949.</span> 
                                    Hostile fire pay
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart E — Attendance and Leave</h4>
                        <h5>Chapter 61 — Hours of Work</h5>
                        <h6>Subchapter I — General Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6101.</span> 
                                    Basic 40-hour workweek; work schedules; regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6102.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6103.</span> 
                                    Holidays
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6104.</span> 
                                    Holidays; daily, hourly, and piece-work basis employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6105.</span> 
                                    Closing of Executive departments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6106.</span> 
                                    Time clocks; restrictions
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Flexible and Compressed Work Schedules</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6120')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6120.</span> 
                                    Purpose
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6121')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6121.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6122')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6122.</span> 
                                    Flexible schedules; agencies authorized to use
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6123')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6123.</span> 
                                    Flexible schedules; computation of premium pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6124')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6124.</span> 
                                    Flexible schedules; holidays
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6125')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6125.</span> 
                                    Flexible schedules; time-recording devices
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6126')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6126.</span> 
                                    Flexible schedules; credit hours; accumulation and compensation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6127')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6127.</span> 
                                    Compressed schedules; agencies authorized to use
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6128')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6128.</span> 
                                    Compressed schedules; computation of premium pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6129')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6129.</span> 
                                    Administration of leave and retirement provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6130')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6130.</span> 
                                    Application of programs in the case of collective bargaining agreements
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6131')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6131.</span> 
                                    Criteria and review
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6132')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6132.</span> 
                                    Prohibition of coercion
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6133')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6133.</span> 
                                    Regulations; technical assistance; program review
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 63 — Leave</h5>
                        <h6>Subchapter I — Annual and Sick Leave</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6301.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6302')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6302.</span> 
                                    General provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6303')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6303.</span> 
                                    Annual leave; accrual
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6304')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6304.</span> 
                                    Annual leave; accumulation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6305')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6305.</span> 
                                    Home leave; leave for Chiefs of Missions; leave for crews of vessels
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6306')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6306.</span> 
                                    Annual leave; refund of lump-sum payment; recredit of annual leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6307')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6307.</span> 
                                    Sick leave; accrual and accumulation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6308')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6308.</span> 
                                    Transfers between positions under different leave systems
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6309')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6309.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6310')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6310.</span> 
                                    Leave of absence; aliens
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6311')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6311.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6312')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6312.</span> 
                                    Accrual and accumulation for former ASCS county office and nonappropriated fund employees
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Other Paid Leave</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6321')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6321.</span> 
                                    Absence of veterans to attend funeral services
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6322')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6322.</span> 
                                    Leave for jury or witness service; official duty status for certain witness service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6323')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6323.</span> 
                                    Military leave; Reserves and National Guardsmen
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6324')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6324.</span> 
                                    Absence of certain police and firemen
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6325')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6325.</span> 
                                    Absence resulting from hostile action abroad
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6326')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6326.</span> 
                                    Absence in connection with funerals of immediate relatives in the Armed Forces
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6327')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6327.</span> 
                                    Absence in connection with serving as a bone-marrow or organ donor
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6328')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6328.</span> 
                                    Absence in connection with funerals of fellow Federal law enforcement officers
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6329')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6329.</span> 
                                    Disabled veteran leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6329a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6329a.</span> 
                                    Administrative leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6329b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6329b.</span> 
                                    Investigative leave and notice leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6329c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6329c.</span> 
                                    Weather and safety leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6329d')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6329d.</span> 
                                    Parental bereavement leave
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Voluntary Transfers of Leave</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6331')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6331.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6332')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6332.</span> 
                                    General authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6333')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6333.</span> 
                                    Receipt and use of transferred leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6334')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6334.</span> 
                                    Donations of leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6335')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6335.</span> 
                                    Termination of medical emergency
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6336')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6336.</span> 
                                    Restoration of transferred leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6337')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6337.</span> 
                                    Accrual of leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6338')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6338.</span> 
                                    Prohibition of coercion
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6339')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6339.</span> 
                                    Additional leave transfer programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6340')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6340.</span> 
                                    Inapplicability of certain provisions
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Voluntary Leave Bank Program</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6361')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6361.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6362')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6362.</span> 
                                    General authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6363')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6363.</span> 
                                    Establishment of leave banks
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6364')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6364.</span> 
                                    Establishment of Leave Bank Boards
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6365')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6365.</span> 
                                    Contributions of annual leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6366')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6366.</span> 
                                    Eligibility for leave recipients
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6367')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6367.</span> 
                                    Receipt and use of leave from a leave bank
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6368')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6368.</span> 
                                    Termination of medical emergency
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6369')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6369.</span> 
                                    Restoration of transferred leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6370')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6370.</span> 
                                    Prohibition of coercion
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6371')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6371.</span> 
                                    Accrual of leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6372')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6372.</span> 
                                    Additional leave bank programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6373')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6373.</span> 
                                    Authority to participate in both programs
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Family and Medical Leave</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6381')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6381.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6382')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6382.</span> 
                                    Leave requirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6383')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6383.</span> 
                                    Certification
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6384')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6384.</span> 
                                    Employment and benefits protection
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6385')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6385.</span> 
                                    Prohibition of coercion
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6386')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6386.</span> 
                                    Health insurance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6387')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6387.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VI — Leave Transfer in Disasters and Emergencies</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6391')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6391.</span> 
                                    Authority for leave transfer program in disasters and emergencies
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 65 — Telework</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('6501')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6501.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6502')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6502.</span> 
                                    Executive agencies telework requirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6503')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6503.</span> 
                                    Training and monitoring
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6504')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6504.</span> 
                                    Policy and support
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6505')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6505.</span> 
                                    Telework Managing Officer
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('6506')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">6506.</span> 
                                    Reports
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart F — Labor-Management and Employee Relations</h4>
                        <h5>Chapter 71 — Labor-Management Relations</h5>
                        <h6>Subchapter I — General Provisions</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7101.</span> 
                                    Findings and purpose
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7102.</span> 
                                    Employees' rights
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7103.</span> 
                                    Definitions; application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7104.</span> 
                                    Federal Labor Relations Authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7105.</span> 
                                    Powers and duties of the Authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7106.</span> 
                                    Management rights
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Rights and Duties of Agencies and Labor Organizations</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7111')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7111.</span> 
                                    Exclusive recognition of labor organizations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7112')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7112.</span> 
                                    Determination of appropriate units for labor organization representation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7113')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7113.</span> 
                                    National consultation rights
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7114')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7114.</span> 
                                    Representation rights and duties
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7115')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7115.</span> 
                                    Allotments to representatives
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7116')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7116.</span> 
                                    Unfair labor practices
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7117')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7117.</span> 
                                    Duty to bargain in good faith; compelling need; duty to consult
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7118')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7118.</span> 
                                    Prevention of unfair labor practices
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7119')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7119.</span> 
                                    Negotiation impasses; Federal Service Impasses Panel
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7120')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7120.</span> 
                                    Standards of conduct for labor organizations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Grievances, Appeals, and Review</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7121')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7121.</span> 
                                    Grievance procedures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7122')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7122.</span> 
                                    Exceptions to arbitral awards
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7123')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7123.</span> 
                                    Judicial review; enforcement
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Administrative and Other Provisions</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7131')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7131.</span> 
                                    Official time
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7132')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7132.</span> 
                                    Subpenas
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7133')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7133.</span> 
                                    Compilation and publication of data
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7134')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7134.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7135')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7135.</span> 
                                    Continuation of existing laws, recognitions, agreements, and procedures
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 72 — Antidiscrimination; Right to Petition Congress</h5>
                        <h6>Subchapter I — Antidiscrimination in Employment</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7201')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7201.</span> 
                                    Antidiscrimination policy; minority recruitment program
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7202')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7202.</span> 
                                    Marital status
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7203')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7203.</span> 
                                    Handicapping condition
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7204')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7204.</span> 
                                    Other prohibitions
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Employees' Right to Petition Congress</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7211')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7211.</span> 
                                    Employees' right to petition Congress
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 73 — Suitability, Security, and Conduct</h5>
                        <h6>Subchapter I — Regulation of Conduct</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7301.</span> 
                                    Presidential regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7302')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7302.</span> 
                                    Post-employment notification
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Employment Limitations</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7311')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7311.</span> 
                                    Loyalty and striking
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7312')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7312.</span> 
                                    Employment and clearance; individuals removed for national security
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7313')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7313.</span> 
                                    Riots and civil disorders
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Political Activities</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7321')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7321.</span> 
                                    Political participation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7322')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7322.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7323')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7323.</span> 
                                    Political activity authorized; prohibitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7324')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7324.</span> 
                                    Political activities on duty; prohibition
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7325')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7325.</span> 
                                    Political activity permitted; employees residing in certain municipalities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7326')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7326.</span> 
                                    Penalties
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Foreign Gifts and Decorations</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7341')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7341.</span> 
                                    [Repealed]
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7342')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7342.</span> 
                                    Receipt and disposition of foreign gifts and decorations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Misconduct</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7351')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7351.</span> 
                                    Gifts to superiors
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7352')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7352.</span> 
                                    Excessive and habitual use of intoxicants
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7353')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7353.</span> 
                                    Gifts to Federal employees
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VI — Drug Abuse, Alcohol Abuse, and Alcoholism</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7361')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7361.</span> 
                                    Drug abuse
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7362')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7362.</span> 
                                    Alcohol abuse and alcoholism
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7363')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7363.</span> 
                                    Reports to Congress
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VII — Mandatory Removal From Employment of Convicted Law Enforcement Officers</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7371')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7371.</span> 
                                    Mandatory removal from employment of law enforcement officers convicted of felonies
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 75 — Adverse Actions</h5>
                        <h6>Subchapter I — Suspension of 14 Days or Less</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7501')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7501.</span> 
                                    Definitions
                                </a>
                            </li>
                        </ul>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7502')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7502.</span> 
                                    Actions covered
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7503')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7503.</span> 
                                    Cause and procedure
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7504')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7504.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Removal, Suspension for More Than 14 Days, Reduction in Grade or Pay, or Furlough for 30 Days or Less</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7511')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7511.</span> 
                                    Definitions; application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7512')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7512.</span> 
                                    Actions covered
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7513')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7513.</span> 
                                    Cause and procedure
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7514')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7514.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7515')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7515.</span> 
                                    Discipline of supervisors based on retaliation against whistleblowers
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Administrative Law Judges</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7521')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7521.</span> 
                                    Actions against administrative law judges
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — National Security</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7531')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7531.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7532')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7532.</span> 
                                    Suspension and removal
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7533')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7533.</span> 
                                    Effect on other statutes
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Senior Executive Service</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7541')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7541.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7542')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7542.</span> 
                                    Actions covered
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7543')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7543.</span> 
                                    Cause and procedure
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 77 — Appeals</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7701')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7701.</span> 
                                    Appellate procedures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7702')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7702.</span> 
                                    Actions involving discrimination
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7703')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7703.</span> 
                                    Judicial review of decisions of the Merit Systems Protection Board
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 79 — Services to Employees</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('7901')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7901.</span> 
                                    Health service programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7902')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7902.</span> 
                                    Safety programs
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7903')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7903.</span> 
                                    Protective clothing and equipment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7904')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7904.</span> 
                                    Employee assistance programs relating to drug abuse and alcohol abuse
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7905')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7905.</span> 
                                    Programs to encourage commuting by means other than single-occupancy motor vehicles
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('7906')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">7906.</span> 
                                    Services of post-combat case coordinators
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart G — Insurance and Annuities</h4>
                        <h5>Chapter 81 — Compensation for Work Injuries</h5>
                        <h6>Subchapter I — Generally</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8101.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8102.</span> 
                                    Compensation for disability or death of employee
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8102a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8102a.</span> 
                                    Death gratuity for injuries incurred in connection with employee's service with an Armed Force
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8103.</span> 
                                    Medical services and initial medical and other benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8104.</span> 
                                    Vocational rehabilitation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8105.</span> 
                                    Total disability
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8106.</span> 
                                    Partial disability
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8107')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8107.</span> 
                                    Compensation schedule
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8108')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8108.</span> 
                                    Reduction of compensation for subsequent injury to same member
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8109')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8109.</span> 
                                    Beneficiaries of awards unpaid at death; order of precedence
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8110')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8110.</span> 
                                    Augmented compensation for dependents
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8111')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8111.</span> 
                                    Additional compensation for services of attendants or vocational rehabilitation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8112')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8112.</span> 
                                    Maximum and minimum monthly payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8113')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8113.</span> 
                                    Increase or decrease of basic compensation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8114')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8114.</span> 
                                    Computation of pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8115')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8115.</span> 
                                    Determination of wage-earning capacity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8116')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8116.</span> 
                                    Limitations on right to receive compensation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8117')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8117.</span> 
                                    Time of accrual of right
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8118')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8118.</span> 
                                    Election to use annual or sick leave
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8119')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8119.</span> 
                                    Notice of injury or death
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8120')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8120.</span> 
                                    Report of injury
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8121')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8121.</span> 
                                    Claim
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8122')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8122.</span> 
                                    Time for making claim
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8123')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8123.</span> 
                                    Physical examinations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8124')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8124.</span> 
                                    Findings and award; hearings
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8125')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8125.</span> 
                                    Misbehavior at proceedings
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8126')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8126.</span> 
                                    Subpenas; oaths; examination of witnesses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8127')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8127.</span> 
                                    Representation; attorneys' fees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8128')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8128.</span> 
                                    Review of award
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8129')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8129.</span> 
                                    Recovery of overpayments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8130')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8130.</span> 
                                    Assignment of claim
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8131')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8131.</span> 
                                    Subrogation of the United States
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8132')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8132.</span> 
                                    Adjustment after recovery from a third person
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8133')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8133.</span> 
                                    Compensation in case of death
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8134')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8134.</span> 
                                    Funeral expenses; transportation of body
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8135')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8135.</span> 
                                    Lump-sum payment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8136')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8136.</span> 
                                    Initial payments outside the United States
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8137')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8137.</span> 
                                    Compensation for noncitizens and nonresidents
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8138')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8138.</span> 
                                    Minimum limit modification for noncitizens and aliens
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8139')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8139.</span> 
                                    Employees of the District of Columbia
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8140')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8140.</span> 
                                    Members of the Reserve Officers' Training Corps
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8141')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8141.</span> 
                                    Civil Air Patrol volunteers
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8142')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8142.</span> 
                                    Peace Corps volunteers
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8143')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8143.</span> 
                                    Job Corps enrollees; volunteers in service to America
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8143a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8143a.</span> 
                                    Members of the National Teacher Corps
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8143b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8143b.</span> 
                                    Employees in fire protection activities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8144')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8144.</span> 
                                    Student-employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8145')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8145.</span> 
                                    Administration
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8146')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8146.</span> 
                                    Administration for the Panama Canal Commission and The Alaska Railroad
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8146a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8146a.</span> 
                                    Cost-of-living adjustment of compensation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8147')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8147.</span> 
                                    Employees' Compensation Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8148')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8148.</span> 
                                    Forfeiture of benefits by convicted felons
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8149')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8149.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8150')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8150.</span> 
                                    Effect on other statutes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8151')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8151.</span> 
                                    Civil service retention rights
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8152')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8152.</span> 
                                    Annual report
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Employees of Nonappropriated Fund Instrumentalities</h6>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8171')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8171.</span> 
                                    Compensation for work injuries; generally
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8172')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8172.</span> 
                                    Employees not citizens or residents of the United States
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8173')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8173.</span> 
                                    Liability under this subchapter exclusive
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Law Enforcement Officers Not Employed by the United States</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8191')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8191.</span> 
                                    Determination of eligibility
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8192')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8192.</span> 
                                    Benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8193')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8193.</span> 
                                    Administration
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 83 — Retirement</h5>
                        <h6>Subchapter I — General Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8301.</span> 
                                    Uniform retirement date
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Forfeiture of Annuities and Retired Pay</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8311')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8311.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8312')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8312.</span> 
                                    Conviction of certain offenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8313')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8313.</span> 
                                    Absence from the United States to avoid prosecution
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8314')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8314.</span> 
                                    Refusal to testify
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8315')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8315.</span> 
                                    Falsifying employment applications
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8316')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8316.</span> 
                                    Refund of contributions and deposits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8317')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8317.</span> 
                                    Repayment of annuity or retired pay properly paid; waiver
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8318')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8318.</span> 
                                    Restoration of annuity or retired pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8319')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8319.</span> 
                                    Removal of members of the uniformed services from rolls; restoration; reappointment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8320')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8320.</span> 
                                    Offense or violation committed in compliance with orders
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8321')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8321.</span> 
                                    Liability of accountable employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8322')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8322.</span> 
                                    Effect on other statutes
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Civil Service Retirement</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8331')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8331.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8332')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8332.</span> 
                                    Creditable service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8333')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8333.</span> 
                                    Eligibility for annuity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8334')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8334.</span> 
                                    Deductions, contributions, and deposits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8335')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8335.</span> 
                                    Mandatory separation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8336')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8336.</span> 
                                    Immediate retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8336a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8336a.</span> 
                                    Phased retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8337')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8337.</span> 
                                    Disability retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8338')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8338.</span> 
                                    Deferred retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8339')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8339.</span> 
                                    Computation of annuity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8340')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8340.</span> 
                                    Cost-of-living adjustment of annuities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8341')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8341.</span> 
                                    Survivor annuities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8342')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8342.</span> 
                                    Lump-sum benefits; designation of beneficiary; order of precedence
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8343')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8343.</span> 
                                    Additional annuities; voluntary contributions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8343a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8343a.</span> 
                                    Alternative forms of annuities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8344')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8344.</span> 
                                    Annuities and pay on reemployment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8345')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8345.</span> 
                                    Payment of benefits; commencement, termination, and waiver of annuity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8345a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8345a.</span> 
                                    Embezzlement or conversion of payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8346')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8346.</span> 
                                    Exemption from legal process; recovery of payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8347')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8347.</span> 
                                    Administration; regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8348')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8348.</span> 
                                    Civil Service Retirement and Disability Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8349')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8349.</span> 
                                    Offset relating to certain benefits under the Social Security Act
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8350')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8350.</span> 
                                    Retirement counseling
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8351')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8351.</span> 
                                    Participation in the Thrift Savings Plan
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 84 — Federal Employees' Retirement System</h5>
                        <h6>Subchapter I — General Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8401')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8401.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8402')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8402.</span> 
                                    Federal Employees' Retirement System; exclusions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8403')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8403.</span> 
                                    Relationship to the Social Security Act
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Basic Annuity</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8410')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8410.</span> 
                                    Eligibility for annuity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8411')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8411.</span> 
                                    Creditable service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8412')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8412.</span> 
                                    Immediate retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8412a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8412a.</span> 
                                    Phased retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8413')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8413.</span> 
                                    Deferred retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8414')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8414.</span> 
                                    Early retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8415')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8415.</span> 
                                    Computation of basic annuity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8416')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8416.</span> 
                                    Survivor reduction for a current spouse
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8417')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8417.</span> 
                                    Survivor reduction for a former spouse
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8418')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8418.</span> 
                                    Survivor elections; deposit; offsets
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8419')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8419.</span> 
                                    Survivor reductions; computation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8420')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8420.</span> 
                                    Insurable interest reductions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8420a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8420a.</span> 
                                    Alternative forms of annuities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8421')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8421.</span> 
                                    Annuity supplement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8421a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8421a.</span> 
                                    Reductions on account of earnings from work performed while entitled to an annuity supplement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8422')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8422.</span> 
                                    Deductions from pay; contributions for other service; deposits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8423')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8423.</span> 
                                    Government contributions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8424')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8424.</span> 
                                    Lump-sum benefits; designation of beneficiary; order of precedence
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8425')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8425.</span> 
                                    Mandatory separation
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter III — Thrift Savings Plan</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8431')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8431.</span> 
                                    Certain transfers to be treated as a separation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8432')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8432.</span> 
                                    Contributions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8432a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8432a.</span> 
                                    Payment of lost earnings
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8432b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8432b.</span> 
                                    Contributions of persons who perform military service
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8432c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8432c.</span> 
                                    Contributions of certain persons reemployed after service with international organizations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8432d')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8432d.</span> 
                                    Qualified Roth contribution program
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8433')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8433.</span> 
                                    Benefits and election of benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8434')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8434.</span> 
                                    Annuities: methods of payment; election; purchase
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8435')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8435.</span> 
                                    Protections for spouses and former spouses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8436')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8436.</span> 
                                    Administrative provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8437')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8437.</span> 
                                    Thrift Savings Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8438')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8438.</span> 
                                    Investment of Thrift Savings Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8439')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8439.</span> 
                                    Accounting and information
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8440')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8440.</span> 
                                    Tax treatment of the Thrift Savings Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8440a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8440a.</span> 
                                    Justices and judges
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8440b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8440b.</span> 
                                    Bankruptcy judges and magistrate judges
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8440c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8440c.</span> 
                                    Court of Federal Claims judges
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8440d')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8440d.</span> 
                                    Judges of the United States Court of Appeals for Veterans Claims
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8440e')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8440e.</span> 
                                    Members of the uniformed services
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8440f')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8440f.</span> 
                                    Maximum percentage allowable for certain participants
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter IV — Survivor Annuities</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8441')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8441.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8442')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8442.</span> 
                                    Rights of a widow or widower
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8443')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8443.</span> 
                                    Rights of a child
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8444')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8444.</span> 
                                    Rights of a named individual with an insurable interest
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8445')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8445.</span> 
                                    Rights of a former spouse
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter V — Disability Benefits</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8451')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8451.</span> 
                                    Disability retirement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8452')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8452.</span> 
                                    Computation of disability annuity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8453')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8453.</span> 
                                    Application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8454')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8454.</span> 
                                    Medical examination
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8455')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8455.</span> 
                                    Recovery; restoration of earning capacity
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8456')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8456.</span> 
                                    Military reserve technicians
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VI — General and Administrative Provisions</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8461')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8461.</span> 
                                    Authority of the Office of Personnel Management
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8462')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8462.</span> 
                                    Cost-of-living adjustments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8463')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8463.</span> 
                                    Rate of benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8464')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8464.</span> 
                                    Commencement and termination of annuities of employees and Members
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8464a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8464a.</span> 
                                    Relationship between annuity and workers' compensation
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8465')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8465.</span> 
                                    Waiver, allotment, and assignment of benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8466')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8466.</span> 
                                    Application for benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8466a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8466a.</span> 
                                    Embezzlement or conversion of payments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8467')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8467.</span> 
                                    Court orders
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8468')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8468.</span> 
                                    Annuities and pay on reemployment
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8469')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8469.</span> 
                                    Withholding of State income taxes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8470')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8470.</span> 
                                    Exemption from legal process; recovery of payments
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter VII — Federal Retirement Thrift Investment Management System</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8471')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8471.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8472')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8472.</span> 
                                    Federal Retirement Thrift Investment Board
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8473')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8473.</span> 
                                    Employee Thrift Advisory Council
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8474')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8474.</span> 
                                    Executive Director
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8475')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8475.</span> 
                                    Investment policies
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8476')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8476.</span> 
                                    Administrative provisions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8477')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8477.</span> 
                                    Fiduciary responsibilities; liability and penalties
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8478')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8478.</span> 
                                    Bonding
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8478a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8478a.</span> 
                                    Investigative authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8479')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8479.</span> 
                                    Exculpatory provisions; insurance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8480')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8480.</span> 
                                    Subpoena authority
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 85 — Unemployment Compensation</h5>
                        <h6>Subchapter I — Employees Generally</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8501')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8501.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8502')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8502.</span> 
                                    Compensation under State agreement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8503')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8503.</span> 
                                    Compensation absent State agreement
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8504')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8504.</span> 
                                    Assignment of Federal service and wages
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8505')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8505.</span> 
                                    Payments to States
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8506')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8506.</span> 
                                    Dissemination of information
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8507')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8507.</span> 
                                    False statements and misrepresentations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8508')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8508.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8509')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8509.</span> 
                                    Federal Employees Compensation Account
                                </a>
                            </li>
                        </ul>

                        <h6>Subchapter II — Ex-Servicemen</h6>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8521')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8521.</span> 
                                    Definitions; application
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8522')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8522.</span> 
                                    Assignment of Federal service and wages
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8523')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8523.</span> 
                                    Dissemination of information
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8524')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8524.</span> 
                                    Repealed
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8525')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8525.</span> 
                                    Effect on other statutes
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 87 — Life Insurance</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8701')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8701.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8702')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8702.</span> 
                                    Automatic coverage
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8703')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8703.</span> 
                                    Benefit certificate
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8704')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8704.</span> 
                                    Group insurance; amounts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8705')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8705.</span> 
                                    Death claims; order of precedence; escheat
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8706')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8706.</span> 
                                    Termination of insurance; assignment of ownership
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8707')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8707.</span> 
                                    Employee deductions; withholding
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8708')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8708.</span> 
                                    Government contributions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8709')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8709.</span> 
                                    Insurance policies
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8710')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8710.</span> 
                                    Reinsurance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8711')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8711.</span> 
                                    Basic tables of premium rates
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8712')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8712.</span> 
                                    Annual accounting; special contingency reserve
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8713')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8713.</span> 
                                    Effect of other statutes
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8714')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8714.</span> 
                                    Employees' Life Insurance Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8714a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8714a.</span> 
                                    Optional insurance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8714b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8714b.</span> 
                                    Additional optional life insurance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8714c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8714c.</span> 
                                    Optional life insurance on family members
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8714d')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8714d.</span> 
                                    Option to receive "living benefits"
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8715')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8715.</span> 
                                    Jurisdiction of courts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8716')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8716.</span> 
                                    Regulations
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 89 — Health Insurance</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8901')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8901.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8902')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8902.</span> 
                                    Contracting authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8902a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8902a.</span> 
                                    Debarment and other sanctions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8903')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8903.</span> 
                                    Health benefits plans
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8903a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8903a.</span> 
                                    Additional health benefits plans
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8903b')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8903b.</span> 
                                    Authority to readmit an employee organization plan
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8903c')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8903c.</span> 
                                    Postal Service Health Benefits Program
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8904')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8904.</span> 
                                    Types of benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8905')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8905.</span> 
                                    Election of coverage
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8905a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8905a.</span> 
                                    Continued coverage
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8906')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8906.</span> 
                                    Contributions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8906a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8906a.</span> 
                                    Temporary employees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8907')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8907.</span> 
                                    Information to individuals eligible to enroll
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8908')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8908.</span> 
                                    Coverage of restored employees and survivor or disability annuitants
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8909')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8909.</span> 
                                    Employees Health Benefits Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8909a')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8909a.</span> 
                                    Postal Service Retiree Health Benefits Fund
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8910')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8910.</span> 
                                    Studies, reports, and audits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8911')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8911.</span> 
                                    Advisory committee
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8912')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8912.</span> 
                                    Jurisdiction of courts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8913')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8913.</span> 
                                    Regulations
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8914')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8914.</span> 
                                    Effect of other statutes
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 89A — Enhanced Dental Benefits</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8951')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8951.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8952')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8952.</span> 
                                    Availability of dental benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8953')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8953.</span> 
                                    Contracting authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8954')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8954.</span> 
                                    Benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8955')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8955.</span> 
                                    Information to individuals eligible to enroll
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8956')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8956.</span> 
                                    Election of coverage
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8957')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8957.</span> 
                                    Coverage of restored survivor or disability annuitants
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8958')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8958.</span> 
                                    Premiums
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8959')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8959.</span> 
                                    Preemption
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8960')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8960.</span> 
                                    Studies, reports, and audits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8961')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8961.</span> 
                                    Jurisdiction of courts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8962')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8962.</span> 
                                    Administrative functions
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 89B — Enhanced Vision Benefits</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('8981')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8981.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8982')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8982.</span> 
                                    Availability of vision benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8983')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8983.</span> 
                                    Contracting authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8984')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8984.</span> 
                                    Benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8985')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8985.</span> 
                                    Information to individuals eligible to enroll
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8986')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8986.</span> 
                                    Election of coverage
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8987')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8987.</span> 
                                    Coverage of restored survivor or disability annuitants
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8988')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8988.</span> 
                                    Premiums
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8989')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8989.</span> 
                                    Preemption
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8990')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8990.</span> 
                                    Studies, reports, and audits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8991')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8991.</span> 
                                    Jurisdiction of courts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('8992')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">8992.</span> 
                                    Administrative functions
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 90 — Long-Term Care Insurance</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9001')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9001.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9002')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9002.</span> 
                                    Availability of insurance
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9003')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9003.</span> 
                                    Contracting authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9004')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9004.</span> 
                                    Financing
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9005')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9005.</span> 
                                    Preemption
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9006')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9006.</span> 
                                    Studies, reports, and audits
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9007')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9007.</span> 
                                    Jurisdiction of courts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9008')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9008.</span> 
                                    Administrative functions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9009')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9009.</span> 
                                    Cost accounting standards
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart H — Access to Criminal History Record Information</h4>
                        <h5>Chapter 91 — Access to Criminal History Records for National Security and Other Purposes</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9101.</span> 
                                    Access to criminal history records for national security and other purposes
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 92 — Prohibition on Criminal History Inquiries Prior to Conditional Offer</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9201')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9201.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9202')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9202.</span> 
                                    Limitations on requests for criminal history record information
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9203')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9203.</span> 
                                    Agency policies; complaint procedures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9204')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9204.</span> 
                                    Adverse action
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9205')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9205.</span> 
                                    Procedures
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9206')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9206.</span> 
                                    Rules of construction
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart I — Miscellaneous</h4>
                        <h5>Chapter 95 — Personnel Flexibilities Relating to the Internal Revenue Service</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9501')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9501.</span> 
                                    Internal Revenue Service personnel flexibilities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9502')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9502.</span> 
                                    Pay authority for critical positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9503')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9503.</span> 
                                    Streamlined critical pay authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9504')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9504.</span> 
                                    Recruitment, retention, relocation incentives, and relocation expenses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9505')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9505.</span> 
                                    Performance awards for senior executives
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9506')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9506.</span> 
                                    Limited appointments to career reserved Senior Executive Service positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9507')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9507.</span> 
                                    Streamlined demonstration project authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9508')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9508.</span> 
                                    General workforce performance management system
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9509')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9509.</span> 
                                    General workforce classification and pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9510')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9510.</span> 
                                    General workforce staffing
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 96 — Personnel Flexibilities Relating to Land Management Agencies</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9601')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9601.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9602')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9602.</span> 
                                    Competitive service; time-limited appointments
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 97 — Department of Homeland Security</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9701')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9701.</span> 
                                    Establishment of human resources management system
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 98 — National Aeronautics and Space Administration</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9801')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9801.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9802')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9802.</span> 
                                    Planning, notification, and reporting requirements
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9803')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9803.</span> 
                                    Restrictions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9804')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9804.</span> 
                                    Recruitment, redesignation, and relocation bonuses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9805')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9805.</span> 
                                    Retention bonuses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9806')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9806.</span> 
                                    Term appointments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9807')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9807.</span> 
                                    Pay authority for critical positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9808')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9808.</span> 
                                    Assignments of intergovernmental personnel
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9809')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9809.</span> 
                                    Science and technology scholarship program
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9810')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9810.</span> 
                                    Distinguished scholar appointment authority
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9811')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9811.</span> 
                                    Travel and transportation expenses of certain new appointees
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9812')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9812.</span> 
                                    Annual leave enhancements
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9813')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9813.</span> 
                                    Limited appointments to Senior Executive Service positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9814')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9814.</span> 
                                    Qualifications pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9815')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9815.</span> 
                                    Reporting requirement
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 99 — Department of Defense Personnel Authorities</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('9901')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9901.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9902')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9902.</span> 
                                    Department of Defense personnel authorities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9903')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9903.</span> 
                                    Attracting highly qualified experts
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9904')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9904.</span> 
                                    Special pay and benefits for certain employees outside the United States
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('9905')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">9905.</span> 
                                    Direct hire authority for certain personnel of the Department of Defense
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 101 — Federal Emergency Management Agency Personnel</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('10101')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10101.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10102')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10102.</span> 
                                    Strategic human capital plan
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10103')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10103.</span> 
                                    Career paths
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10104')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10104.</span> 
                                    Recruitment bonuses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10105')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10105.</span> 
                                    Retention bonuses
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10106')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10106.</span> 
                                    Quarterly report on vacancy rate in employee positions
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 102 — United States Secret Service Uniformed Division Personnel</h5>
                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('10201')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10201.</span> 
                                    Definitions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10202')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10202.</span> 
                                    Authorities
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10203')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10203.</span> 
                                    Basic pay
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10204')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10204.</span> 
                                    Rate of pay for original appointments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10205')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10205.</span> 
                                    Service step adjustments
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10206')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10206.</span> 
                                    Technician positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10207')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10207.</span> 
                                    Promotions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10208')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10208.</span> 
                                    Demotions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10209')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10209.</span> 
                                    Clothing allowances
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10210')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10210.</span> 
                                    Reporting requirement
                                </a>
                            </li>
                        </ul>

                        <h5>Chapter 103 — Department of State</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('10301')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10301.</span> 
                                    Notice of employment opportunities for Department of State and USAID positions
                                </a>
                            </li>
                            <li>
                                <a
                                    :href="getStatuteUrl('10302')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">10302.</span> 
                                    Consulting services for the Department of State
                                </a>
                            </li>
                        </ul>

                        <h4>Subpart J — Enhanced Personnel Security Programs</h4>
                        <h5>Chapter 110 — Enhanced Personnel Security Programs</h5>

                        <ul>
                            <li>
                                <a
                                    :href="getStatuteUrl('11001')"
                                    class="external"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span class="section-number">11001.</span> 
                                    Enhanced personnel security programs
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>
