class CustomError extends Error {
    constructor(statusCode, errorType, message) {
        super(message)
        this.statusCode = statusCode;
        this.errorType = errorType;
    }
}

module.exports = CustomError;