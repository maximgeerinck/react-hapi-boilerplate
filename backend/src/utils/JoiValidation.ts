export default class JoiValidationErrorAdapter {
    public errors: any[];
    constructor(errors: any[]) {
        this.errors = errors;
    }

    public convert() {
        let output: any = {};

        this.errors.forEach((element) => {
            output[element.path] = {
                path: element.path,
                code: element.type
            };

            if (element.context.limit) {
                output[element.path].data = { limit: element.context.limit };
            }
        });

        return output;
    }
}
