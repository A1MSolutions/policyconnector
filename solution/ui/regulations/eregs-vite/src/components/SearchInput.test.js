import flushPromises from "flush-promises";
import { render } from "@testing-library/vue";
import { describe, it, expect } from "vitest";

import SearchInput from "./SearchInput.vue";

const stubs = {
    "v-text-field": { template: "<input />" },
    "v-icon": true,
};

describe("SearchInput synonyms", () => {
    it("renders similar terms when synonyms are provided", async () => {
        const { container } = render(SearchInput, {
            props: {
                formClass: "search-form",
                label: "Search",
                searchQuery: "FMAP",
                synonyms: ["Federal Medical Assistance Percentage", "match rate"],
                showSuggestions: true,
            },
            global: { stubs },
        });
        await flushPromises();
        expect(container.textContent).toMatch(/similar terms/i);
        expect(container.textContent).toMatch(/match rate/);
    });

    it("hides similar terms when synonyms are empty", async () => {
        const { container } = render(SearchInput, {
            props: {
                formClass: "search-form",
                label: "Search",
                searchQuery: "FMAP",
                synonyms: [],
                showSuggestions: true,
            },
            global: { stubs },
        });
        await flushPromises();
        expect(container.textContent || "").not.toMatch(/similar terms/i);
    });
});
