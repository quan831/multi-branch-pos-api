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
 */
router.get(
    "/status",
    verifyToken,
    syncController.getSyncStatus
);

module.exports = router;