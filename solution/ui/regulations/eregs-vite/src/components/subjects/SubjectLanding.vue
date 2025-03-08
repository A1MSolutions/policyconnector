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
        <h1>Research Executive Actions</h1>

        <p>
            <strong>Pick an executive order or memo</strong> 
            to find related guidance, statutes, and prior executive orders.
        </p>

        <span>Or browse by category:</span>
        <ul>
            <li><a href="?categories=9">Court Cases</a></li>
            <li><a href="?categories=5">Executive Orders and Memos</a></li>
            <li><a href="?categories=11">OPM Memos</a></li>
            <li><a href="?categories=10">OPM Publications</a></li>
            <li><a href="?categories=13">Merit Systems Protection Board Publications</a></li>
            <li><a href="?categories=2">Congressional Research Service Reports</a></li>
        </ul>
    </div>
</template>

<style></style>
