import { ref } from "vue";

import { getCombinedContent, getContentWithoutQuery } from "utilities/api.js";
import { DOCUMENT_TYPES_MAP } from "utilities/utils.js";

function useSearchResults({ getCombinedContent, getContentWithoutQuery }) {
    const policyDocList = ref({
        count: 0,
        results: [],
        summary: null,
        loading: true,
        error: false,
    });

    const getDocList = async ({
        apiUrl,
        pageSize,
        requestParamString = "",
        query,
        type,
    }) => {
        policyDocList.value.loading = true;
        policyDocList.value.error = false;

        // Always include summarize=true in the request
        const requestParams = `${requestParamString}&page_size=${pageSize}&group_resources=false&summarize=true`;
        const docType = type ? DOCUMENT_TYPES_MAP[type] : undefined;

        let contentList;

        try {
            if (query) {
                contentList = await getCombinedContent({
                    apiUrl,
                    requestParams,
                    docType,
                });
            } else {
                contentList = await getContentWithoutQuery({
                    apiUrl,
                    requestParams,
                    docType,
                });
            }

            policyDocList.value.results = contentList.results;
            policyDocList.value.count = contentList.count;
            policyDocList.value.summary = contentList.summary || null;
        } catch (error) {
            console.error(error);
            policyDocList.value.results = [];
            policyDocList.value.count = 0;
            policyDocList.value.summary = null;
            policyDocList.value.error = true;
        } finally {
            policyDocList.value.loading = false;
        }
    };

    const clearDocList = () => {
        policyDocList.value.results = [];
        policyDocList.value.count = 0;
        policyDocList.value.summary = null;
        policyDocList.value.loading = false;
        policyDocList.value.error = false;
    };

    return { policyDocList, getDocList, clearDocList };
}

export default () =>
    useSearchResults({ getCombinedContent, getContentWithoutQuery });
