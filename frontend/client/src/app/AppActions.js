export const setDocumentTitle = title => {
    document.title = title;
};
export const resetDocumentTitle = () => {
    if (window.discovery) {
        document.title = window.discovery.originalDocumentTitle;
    }
};
