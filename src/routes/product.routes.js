const express = require("express");

const router = express.Router();

const productController = require(
    "../controllers/product.controller"
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
    productController.getAllProducts
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "staff"),
    productController.getProductById
);

router.post(
    "/",
    verifyToken,
    authorizeRoles("admin"),
    productController.createProduct
);

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    productController.updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    productController.deleteProduct
);

module.exports = router;