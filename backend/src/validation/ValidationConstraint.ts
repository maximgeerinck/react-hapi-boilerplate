import ValidationError from "./ValidationError";
abstract class ValidationConstraint {
    public constraint: string;
    constructor(constraint: string = "ValidationConstraint") {
        this.constraint = constraint;
    }
    public abstract validate(): Promise<ValidationError>;
}

export default ValidationConstraint;
