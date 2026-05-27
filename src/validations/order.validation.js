const { body } = require("express-validator");

const orderValidation = {
    create: [
        body("customerId")
            .optional({ nullable: true })
            .isInt()
            .withMessage("CustomerId must be an integer"),
        body("items")
            .notEmpty()
            .withMessage("Order items are required")
            .isArray({ min: 1 })
            .withMessage("Items must be an array with at least one item"),
        body("items.*.productId")
            .notEmpty()
            .withMessage("Item productId is required")
            .isInt()
            .withMessage("Item productId must be an integer"),
        body("items.*.quantity")
            .notEmpty()
            .withMessage("Item quantity is required")
            .isInt({ min: 1 })
            .withMessage("Item quantity must be a positive integer"),

        body("paymentMethod")
            .optional()
            .isIn(["cash", "card", "transfer"])
            .withMessage("Invalid payment method"),
        body("discount")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Discount must be a positive number"),
    ],
    updateStatus: [
        body("status")
            .notEmpty()
            .withMessage("Status is required")
            .isIn(["pending", "completed", "cancelled"])
            .withMessage("Invalid status"),
    ]
};

module.exports = orderValidation;
