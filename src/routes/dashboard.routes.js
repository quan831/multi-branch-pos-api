const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics and statistics
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics and analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         description: Branch ID to filter statistics, or "all" to retrieve stats across all branches (admin only)
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                     totalOrders:
 *                       type: integer
 *                     lowStockCount:
 *                       type: integer
 *                     totalProducts:
 *                       type: integer
 *                     recentOrders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *                     revenueByBranch:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           branchId:
 *                             type: integer
 *                           revenue:
 *                             type: number
 *                           Branch:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 */
router.get("/stats", verifyToken, dashboardController.getStats);

module.exports = router;

