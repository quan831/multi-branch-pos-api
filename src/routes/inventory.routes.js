const express = require("express");

const router = express.Router();

const inventoryController = require(
    "../controllers/inventory.controller"
);

const {
    verifyToken
} = require("../middlewares/auth.middleware");

router.get(
    "/",
    verifyToken,
    inventoryController.getAllInventories
);

router.get(
    "/:id",
    verifyToken,
    inventoryController.getInventoryById
);

router.post(
    "/",
    verifyToken,
    inventoryController.createInventory
);

router.put(
    "/:id",
    verifyToken,
    inventoryController.updateInventory
);

router.delete(
    "/:id",
    verifyToken,
    inventoryController.deleteInventory
);

module.exports = router;