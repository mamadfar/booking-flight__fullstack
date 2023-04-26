
class HttpError extends Error {
    message: string;
    code: number;
    constructor(errorMessage: string, errorCode: number) {
        super(errorMessage);
        this.message = errorMessage;
        this.code = errorCode;
    }
};

export default HttpError;