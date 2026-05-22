const { body } = require("express-validator");

const syncValidation = {
    pushData: [
        body("orders")
            .notEmpty()
            .withMessage("Orders array is required")
            .isArray()
            .withMessage("Orders must be an array"),
    ],
    pullStatus: [
        body("orderIds")
            .notEmpty()
            .withMessage("orderIds array is required")
            .isArray()
            .withMessage("orderIds must be an array"),
        body("orderIds.*")
            .isInt()
            .withMessage("Each orderId must be an integer")
    ]
};

module.exports = syncValidation;
