import * as Boom from "boom";
import ValidationConstraint from "./ValidationConstraint";
import ValidationError, { IValidationError } from "./ValidationError";

class Validator {
    public errors: ValidationError[] = [];
    public constraints: ValidationConstraint[] = [];

    public addError(error: IValidationError) {
        if (error) { this.errors.push(error); }
    }

    public addErrors(errors: IValidationError[]) {
        if (!errors) { return; }
        for (const error of errors) {
            this.addError(error);
        }
    }

    public isValid(): boolean {
        return this.errors.length === 0;
    }

    public toObject() {
        const errors: any = {};
        for (const error of this.errors) {
            errors[error.path] = {
                path: error.path,
                code: error.code,
            };
        }
        return errors;
    }

    public generateBadRequest(key: string = "E_VALIDATION") {
        console.log("generating bad request");
        // let boomErr = Boom.badRequest(key, this.toObject());

        const error: any = Boom.badRequest();
        error.reformat();
        error.output.payload.validation = this.toObject();
        // boomErr.output.payload.data = boomErr.data;
        return error;
    }

    public addValidation(constraint: ValidationConstraint) {
        this.constraints.push(constraint);
    }

    public validate(): Promise<any> {
        const self = this;
        return Promise.all(this.constraints.map((constraint) => constraint.validate())).then(
            (errors) => {
                this.addErrors(errors);
                return self.isValid() ? Promise.resolve(true) : Promise.reject(this.toObject());
            },
        );
    }
}

export default Validator;
