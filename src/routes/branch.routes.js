const express = require("express");

const router = express.Router();

const branchController = require("../controllers/branch.controller");

const {
    verifyToken
} = require("../middlewares/auth.middleware");

const {
    authorizeRoles
} = require("../middlewares/role.middleware");
const { validate } = require("../middlewares/validate.middleware");
const branchValidation = require("../validations/branch.validation");

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management
 */

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all branches
 */
router.get("/", verifyToken, branchController.getAllBranches);

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branches]
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
 *         description: Branch details
 */
router.get("/:id", verifyToken, branchController.getBranchById);

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a new branch (Admin only)
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created
 */
router.post("/", verifyToken, authorizeRoles("admin"), branchValidation.create, validate, branchController.createBranch);

/**
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Update branch (Admin only)
 *     tags: [Branches]
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
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated
 */
router.put("/:id", verifyToken, authorizeRoles("admin"), branchValidation.update, validate, branchController.updateBranch);

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Delete branch (Admin only)
 *     tags: [Branches]
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
 *         description: Branch deleted
 */
router.delete("/:id", verifyToken, authorizeRoles("admin"), branchController.deleteBranch);

module.exports = router;