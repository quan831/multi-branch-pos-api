const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const {verifyToken} = require("../middlewares/auth.middleware");
const {validate} = require("../middlewares/validate.middleware");
const authValidation = require("../validations/auth.validation");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 */
router.post("/login", authValidation.login, validate, authController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile information
 */
router.get("/profile", verifyToken, authController.getProfile);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user details (alias of profile)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current authenticated user details
 */
router.get("/me", verifyToken, authController.getProfile);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", verifyToken, authController.logout);

// Helper endpoint to seed database (local or remote) easily via HTTP
router.get("/seed", async (req, res) => {
    // Bảo mật: Yêu cầu tham số secret để tránh người ngoài truy cập trái phép reset database
    const secretKey = req.query.secret;
    if (secretKey !== process.env.PASS_SECRET) {
        return res.status(403).json({ 
            success: false, 
            message: "Access Denied: Invalid or missing secret key!" 
        });
    }

    try {
        const { Product, Branch, Customer, User, Inventory } = require("../models/associations");
        const sequelize = require("../config/database");
        const bcrypt = require("bcryptjs");

        console.log("Triggering database sync & seeding...");
        // Recreate all tables
        await sequelize.sync({ force: true });
        
        // Seed branches
        const branch1 = await Branch.create({ name: "Hà Nội - Chi nhánh 1", address: "123 Cầu Giấy, Hà Nội" });
        const branch2 = await Branch.create({ name: "TP.HCM - Chi nhánh 2", address: "456 Quận 1, TP.HCM" });
        
        // Seed users
        const hashedPassword = await bcrypt.hash("password123", 10);
        await User.create({
            username: "admin",
            password: hashedPassword,
            role: "admin",
            branchId: branch1.id
        });
        
        await User.create({
            username: "staff1",
            password: hashedPassword,
            role: "staff",
            branchId: branch1.id
        });

        await User.create({
            username: "staff2",
            password: hashedPassword,
            role: "staff",
            branchId: branch2.id
        });
        
        // Seed products
        const product1 = await Product.create({
            name: "iPhone 15 Pro",
            price: 999.99,
            description: "Latest Apple flagship with titanium frame"
        });

        const product2 = await Product.create({
            name: "Samsung Galaxy S24 Ultra",
            price: 1199.99,
            description: "Premium Android with AI features and S-Pen"
        });

        const product3 = await Product.create({
            name: "MacBook Air M3",
            price: 1099.00,
            description: "Thin and light laptop with M3 chip"
        });

        // Branch 1 Inventory
        await Inventory.create({ productId: product1.id, branchId: branch1.id, quantity: 15 });
        await Inventory.create({ productId: product2.id, branchId: branch1.id, quantity: 10 });
        await Inventory.create({ productId: product3.id, branchId: branch1.id, quantity: 5 });

        // Branch 2 Inventory
        await Inventory.create({ productId: product1.id, branchId: branch2.id, quantity: 8 });
        await Inventory.create({ productId: product2.id, branchId: branch2.id, quantity: 12 });
        await Inventory.create({ productId: product3.id, branchId: branch2.id, quantity: 0 });

        // Seed customers
        await Customer.create({ name: "Nguyễn Văn A", phone: "0912345678", email: "a@gmail.com" });
        await Customer.create({ name: "Trần Thị B", phone: "0987654321", email: "b@gmail.com" });
        await Customer.create({ name: "Lê Văn C", phone: "0905556667", email: "c@gmail.com" });

        console.log("Database seeded successfully via HTTP endpoint!");
        return res.json({ 
            success: true, 
            message: "Database synced and seeded successfully!",
            users: ["admin", "staff1", "staff2"],
            defaultPassword: "password123"
        });
    } catch (err) {
        console.error("Seeding error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;