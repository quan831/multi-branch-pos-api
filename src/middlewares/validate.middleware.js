const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                msg: err.msg,
                param: err.path, // express-validator v7 uses 'path' instead of 'param'
                location: err.location
            }))
        });
    }
    next();
};

module.exports = {
    validate
};
