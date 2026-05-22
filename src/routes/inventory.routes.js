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
const { validate } = require("../middlewares/validate.middleware");
const inventoryValidation = require("../validations/inventory.validation");

/**
 * @swagger
 * tags:
 *   name: Inventories
 *   description: Inventory management
 */

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get all inventories
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all inventories
 */
router.get(
    "/",
    verifyToken,
    authorizeRoles("admin", "staff"),
    inventoryController.getAllInventories
);

/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     summary: Get inventory by ID
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory details
 */
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "staff"),
    inventoryController.getInventoryById
);

/**
 * @swagger
 * /inventories:
 *   post:
 *     summary: Create a new inventory record (Admin only)
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       201:
 *         description: Inventory record created
 */
router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    inventoryValidation.add,
    validate,
    inventoryController.createInventory
);

/**
 * @swagger
 * /inventories/{id}:
 *   put:
 *     summary: Update inventory record (Admin only)
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: Inventory record updated
 */
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    inventoryValidation.adjust,
    validate,
    inventoryController.updateInventory
);

/**
 * @swagger
 * /inventories/{id}:
 *   delete:
 *     summary: Delete inventory record (Admin only)
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory record deleted
 */
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    inventoryController.deleteInventory
);

module.exports = router;