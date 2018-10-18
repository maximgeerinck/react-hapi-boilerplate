class NotFoundException extends Error {
    constructor(message: string) {
        super(message);
        delete this.stack;
    }
}

export default NotFoundException;
