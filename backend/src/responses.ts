export const success = (data) => {
    const obj: any = { success: true };
    if (data) {
        obj.data = data.toResponse ? data.toResponse() : data;
    }
    return obj;
};
