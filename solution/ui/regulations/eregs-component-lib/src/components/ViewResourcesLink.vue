<template>
    <div v-if="isLink()" class="view-resources-link">
        <button
            v-if="count !== '0'"
            class="link-btn"
            @click="clickHandler"
        >
            <span class="bold">View {{ section }} Resources</span> ({{ count }})
        </button>
        <div v-else class="bold disabled">
            No resources for {{ section }}.
        </div>
    </div>
    <div
        v-else
        class="view-resources-link"
        style="padding-left: 5px"
    >
        <button
            v-if="count !== '0'"
            class="btn"
            @click="clickHandler"
        >
            <span class="bold">View {{ section }} resources</span>
            <span class="count"> ({{ count }})</span>
        </button>
        <button v-else class="btn disabled">
            <span class="bold">{{ section }} Resources</span>
            <span class="count"> (0)</span>
        </button>
    </div>
</template>

<script>
import { EventCodes } from "utilities/utils";
import eventbus from "../eventbus";

export default {
    name: "ViewResourcesLink",

    /* Start LLM code */
    data() {
        return {
            scrollOrigin: null,
            hasScrolled: false
        };
    },
    /* End LLM code */

    props: {
        section: {
            type: String,
            required: true,
        },
        count: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: "link",
        },
    },
    methods: {
    /* Start partially LLM code */
        clickHandler() {
            // Store the current scroll position before navigating
            const scrollOrigin = window.pageYOffset;

            // Emit an event with the scroll origin
            eventbus.emit(EventCodes.TrackScrollOrigin, {
                origin: scrollOrigin
            });

            eventbus.emit(EventCodes.SetSection, {
                section: this.section,
                count: this.count,
            });

            // Scroll to resources section, using width defined in $mobile-max in _application_settings.scss; LLM code
            if (window.innerWidth < 767) {
                const resourcesHeading = document.querySelector('#right-sidebar');
                if (resourcesHeading) {
                    resourcesHeading.scrollIntoView({ behavior: 'smooth' });
                }
            }
        },
        goBack() {
            if (this.scrollOrigin !== null) {
                window.scrollTo({
                    top: this.scrollOrigin,
                    behavior: 'smooth'
                });
                // Reset the origin and scrolled state after scrolling back
                this.scrollOrigin = null;
                this.hasScrolled = false;
            }
        },
        /* End partially LLM code */
        isLink() {
            return this.type === "link";
        },
    },
};
</script>
