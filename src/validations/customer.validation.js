const { body } = require("express-validator");

const customerValidation = {
    create: [
        body("name")
            .notEmpty()
            .withMessage("Name is required")
            .isString()
            .withMessage("Name must be a string"),
        body("phone")
            .notEmpty()
            .withMessage("Phone is required")
            .matches(/^[0-9]+$/)
            .withMessage("Invalid phone number"),
        body("email")
            .optional()
            .isEmail()
            .withMessage("Invalid email"),
        body("address")
            .optional()
            .isString()
            .withMessage("Address must be a string"),
    ],
    update: [
        body("name")
            .optional()
            .notEmpty()
            .withMessage("Name cannot be empty if provided")
            .isString()
            .withMessage("Name must be a string"),
        body("phone")
            .optional()
            .matches(/^[0-9]+$/)
            .withMessage("Invalid phone number"),
        body("email")
            .optional()
            .isEmail()
            .withMessage("Invalid email"),
        body("address")
            .optional()
            .isString()
            .withMessage("Address must be a string"),
    ]
};

module.exports = customerValidation;
