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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       403:
 *         description: Forbidden
 */
router.get(
    "/",
    verifyToken,
    authorizeRoles(
        "admin"
    ),
    orderController.getAllOrders
);

/**
 * @swagger
 * /orders/history:
 *   get:
 *     summary: Get order history (Admin or Staff)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders filtered by branch for staff
 */
router.get(
    "/history",
    verifyToken,
    authorizeRoles(
        "admin",
        "staff"
    ),
    orderController.getOrderHistory
);

/**
 * @swagger
 * /orders/next-id:
 *   get:
 *     summary: Get the next globally available order ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Next order ID
 *       403:
 *         description: Forbidden
 */
router.get(
    "/next-id",
    verifyToken,
    authorizeRoles(
        "admin",
        "staff"
    ),
    orderController.getNextOrderId
);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
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
 *         description: Order details
 */
router.get(
    "/:id",
    verifyToken,
    authorizeRoles(
        "admin",
        "staff"
    ),
    orderController.getOrderById
);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created
 */
router.post(
    "/",
    verifyToken,
    authorizeRoles("admin", "staff"),
    orderController.createOrder
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order (Admin only)
 *     tags: [Orders]
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
 *         description: Order deleted
 */
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    orderController.deleteOrder
);

module.exports = router;