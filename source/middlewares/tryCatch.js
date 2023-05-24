const tryCatch = (callback) => async (req, res, next) => {
    try {
        await callback(req, res, next);
    }
    catch (error) {
        next(error);
    }
}

module.exports = tryCatch;