const express = require("express");

const router = express.Router();

const orderController = require(
    "../controllers/order.controller"
);

const {
    verifyToken
} = require("../middlewares/auth.middleware");

router.post(
    "/",
    verifyToken,
    orderController.createOrder
);

module.exports = router;