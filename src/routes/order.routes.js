const express = require("express");

const router = express.Router();

const orderController = require(
    "../controllers/order.controller"
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
    authorizeRoles(
        "admin",
        "staff"
    ),
    orderController.getAllOrders
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "staff"
    ),
    orderController.getOrderById
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin", "staff"),
    orderController.createOrder
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    orderController.deleteOrder
);

module.exports = router;