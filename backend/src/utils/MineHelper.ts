export const timeout = (ms: number) => new Promise((res: any) => setTimeout(res, ms));

export const batch = async (promises: any, batchSize: number, timeoutMs: number = 1000) => {
    const array = [].concat(promises);

    while (array.length) {
        const length = array.length >= batchSize ? batchSize : array.length;

        const currentBatch: Array<Promise<any>> = [];
        for (let i = 0; i < length; i++) {
            currentBatch.push(array[0]);
            array.shift();
        }
        await Promise.all(currentBatch.map((item: any) => item()));
        await timeout(timeoutMs);
    }

    return;
};
