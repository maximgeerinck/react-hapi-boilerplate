export const stripUrl = (url) => {
    const part = /(img-.*)$/.exec(url);
    return part[1];
};
