const tryCatch = (callback) => async (req, res, next) => {
    try {
        await callback(req, res);
    }
    catch (error) {
        return next(error);
    }
    finally {
        next();
    }
}

module.exports = tryCatch;