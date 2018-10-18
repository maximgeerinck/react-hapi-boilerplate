export interface IValidationError {
    path: string;
    code: string;
    data?: any;
}

export default class ValidationError implements IValidationError {
    public path: string;
    public code: string;
    public data?: any;

    constructor(name: string, message: string, data?: any) {
        this.path = name;
        this.code = message;
        this.data = data;
    }
}
