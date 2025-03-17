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
        <h1>Find Policy Related to a Subject</h1>

        <p>Select a subject to look up executive orders, subregulatory guidance, court cases, rules, and more.</p>

        <h3>OPM Indexes of Laws and Regulations</h3>

        <span>
            Find legal authorities:
        </span>

        <ul>
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
    </div>
</template>

<style></style>
