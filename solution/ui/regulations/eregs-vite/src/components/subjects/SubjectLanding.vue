<script setup>
defineProps({
    policyDocSubjects: {
        type: Object,
        default: () => ({ results: [], loading: true }),
    },
});
</script>

<template>
    <div class="subj-landing__container">
        <h1>Find Policy Documents</h1>

        <p>Pick a subject to find related documents.</p>

        <h3>Browse All Documents</h3>
        <ul>
            <li><a href="?categories=4">Statutes</a></li>
            <li><a href="?categories=9">Court Cases</a></li>
            <li><a href="?categories=1">Proposed and Final Rules</a></li>
            <li><a href="?categories=5">Executive Orders and Memos</a></li>
            <li><a href="?categories=22">Presidential Statements</a></li>
            <li><a href="?categories=11">OPM Memos</a></li>
            <li><a href="?categories=10">OPM Publications</a></li>
            <li><a href="?categories=16">Equal Employment Opportunity Commission Publications</a></li>
            <li><a href="?categories=13">Merit Systems Protection Board Publications</a></li>
            <li><a href="?categories=17">OMB Memos and Publications</a></li>
            <li><a href="?categories=20">Office of Special Counsel Documents</a></li>
            <li><a href="?categories=3">GAO Reports</a></li>
            <li><a href="?categories=2">Congressional Research Service Reports</a></li>
            <li><a href="?categories=15">Other Agency Publications</a></li>
        </ul>
    </div>
</template>

<style></style>
