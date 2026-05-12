const express = require("express");

const router = express.Router();

const inventoryController = require(
    "../controllers/inventory.controller"
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
    inventoryController.getAllInventories
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "staff"),
    inventoryController.getInventoryById
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    inventoryController.createInventory
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    inventoryController.updateInventory
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    inventoryController.deleteInventory
);

module.exports = router;