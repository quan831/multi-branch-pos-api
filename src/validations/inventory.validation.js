const { body } = require("express-validator");

const inventoryValidation = {
    add: [
        body("productId")
            .notEmpty()
            .withMessage("ProductId is required")
            .isInt()
            .withMessage("ProductId must be an integer"),
        body("branchId")
            .notEmpty()
            .withMessage("BranchId is required")
            .isInt()
            .withMessage("BranchId must be an integer"),
        body("quantity")
            .notEmpty()
            .withMessage("Quantity is required")
            .isInt()
            .withMessage("Quantity must be an integer"),
    ],
    adjust: [
        body("quantity")
            .notEmpty()
            .withMessage("Quantity is required")
            .isInt()
            .withMessage("Quantity must be an integer"),
    ]
};

module.exports = inventoryValidation;
