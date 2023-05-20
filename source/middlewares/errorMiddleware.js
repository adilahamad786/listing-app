const errorMiddleware = (error, req, res, next) => {
    let message = error.message || "Internal server error!";
    let errorType = error.errorType || "Internal";
    let statusCode = error.statusCode || 500;

    if (error?.keyPattern) {
        if (error.keyPattern?.phone)
            message = "Phone number already exist!";
        if (error.keyPattern?.email)
            message = "Email already exist!";
        if (error.keyPattern?.itemCode)
            message = "Invalid itemcode!";
        
        errorType = "CONFLICT";
        statusCode = 409;
    }

    if (error.kind === "date") {
        message = "Invalid date!"
        errorType = "BAD_REQUEST";
        statusCode = 400;
    }

    return res.json({
        error : {
            errorType,
            statusCode
        },
        message
    });
}

module.exports = errorMiddleware;