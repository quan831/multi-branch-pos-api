const express = require("express");

const router = express.Router();

const customerController = require(
    "../controllers/customer.controller"
);

const {
    verifyToken
} = require("../middlewares/auth.middleware");

router.get(
    "/",
    verifyToken,
    customerController.getAllCustomers
);

router.get(
    "/:id",
    verifyToken,
    customerController.getCustomerById
);

router.post(
    "/",
    verifyToken,
    customerController.createCustomer
);

router.put(
    "/:id",
    verifyToken,
    customerController.updateCustomer
);

router.delete(
    "/:id",
    verifyToken,
    customerController.deleteCustomer
);

module.exports = router;