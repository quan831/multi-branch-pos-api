const express = require("express");

const router = express.Router();

const customerController = require(
    "../controllers/customer.controller"
);

const {
    verifyToken
} = require("../middlewares/auth.middleware");

const {
    authorizeRoles
} = require("../middlewares/role.middleware");

router.get(
    "/",
    verifyToken,
    authorizeRoles("admin", "staff"),
    customerController.getAllCustomers
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "staff"),
    customerController.getCustomerById
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin", "staff"),
    customerController.createCustomer
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    customerController.updateCustomer
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    customerController.deleteCustomer
);

module.exports = router;