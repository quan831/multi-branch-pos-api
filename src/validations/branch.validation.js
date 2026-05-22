const { body } = require("express-validator");

const branchValidation = {
    create: [
        body("name")
            .notEmpty()
            .withMessage("Name is required")
            .isString()
            .withMessage("Name must be a string"),
        body("address")
            .optional()
            .isString()
            .withMessage("Address must be a string"),
        body("phone")
            .optional()
            .isString()
            .withMessage("Phone must be a string"),
    ],
    update: [
        body("name")
            .optional()
            .notEmpty()
            .withMessage("Name cannot be empty if provided")
            .isString()
            .withMessage("Name must be a string"),
        body("address")
            .optional()
            .isString()
            .withMessage("Address must be a string"),
        body("phone")
            .optional()
            .isString()
            .withMessage("Phone must be a string"),
    ]
};

module.exports = branchValidation;
