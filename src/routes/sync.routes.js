const express = require("express");

const router = express.Router();

const syncController = require("../controllers/sync.controller");

const {verifyToken} = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Sync
 *   description: Data synchronization
 */

/**
 * @swagger
 * /sync/orders:
 *   post:
 *     summary: Sync orders from remote/local
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SyncOrdersRequest'
 *     responses:
 *       200:
 *         description: Sync successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.post(
    "/orders",
    verifyToken,
    syncController.syncOrders
);

/**
 * @swagger
 * /sync/status:
 *   get:
 *     summary: Get synchronization status
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current sync status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pending:
 *                   type: integer
 *                 synced:
 *                   type: integer
 *                 failed:
 *                   type: integer
 */
router.get(
    "/status",
    verifyToken,
    syncController.getSyncStatus
);

/**
 * @swagger
 * /sync/pending:
 *   get:
 *     summary: Get pending synchronization orders
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       staffId:
 *                         type: integer
 *                       branchId:
 *                         type: integer
 *                       customerId:
 *                         type: integer
 *                       paymentMethod:
 *                         type: string
 *                       totalAmount:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       items:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/OrderItem'
 */
router.get(
    "/pending",
    verifyToken,
    syncController.getPendingOrders
);

/**
 * @swagger
 * /sync/status:
 *   put:
 *     summary: Update synchronization status for selected orders
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SyncStatusUpdateRequest'
 *     responses:
 *       200:
 *         description: Sync status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                     updatedCount:
 *                       type: integer
 */
router.put(
    "/status",
    verifyToken,
    syncController.updateSyncStatus
);

module.exports = router;