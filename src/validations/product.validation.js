const { body } = require("express-validator");

const productValidation = {
    create: [
        body("name")
            .notEmpty()
            .withMessage("Name is required")
            .isString()
            .withMessage("Name must be a string"),
        body("price")
            .notEmpty()
            .withMessage("Price is required")
            .isFloat({ min: 0 })
            .withMessage("Price must be a positive number"),
        body("barcode")
            .optional()
            .isString()
            .withMessage("Barcode must be a string"),
        body("categoryId")
            .optional()
            .isInt()
            .withMessage("CategoryId must be an integer"),
    ],
    update: [
        body("name")
            .optional()
            .notEmpty()
            .withMessage("Name cannot be empty if provided")
            .isString()
            .withMessage("Name must be a string"),
        body("price")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Price must be a positive number"),
        body("barcode")
            .optional()
            .isString()
            .withMessage("Barcode must be a string"),
        body("categoryId")
            .optional()
            .isInt()
            .withMessage("CategoryId must be an integer"),
    ]
};

module.exports = productValidation;
