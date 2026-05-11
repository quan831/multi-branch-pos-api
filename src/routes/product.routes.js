const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const {
    verifyToken
} = require("../middlewares/auth.middleware");

router.get(
    "/",
    verifyToken,
    productController.getAllProducts
);

router.get(
    "/:id",
    verifyToken,
    productController.getProductById
);

router.post(
    "/",
    verifyToken,
    productController.createProduct
);

router.put(
    "/:id",
    verifyToken,
    productController.updateProduct
);

router.delete(
    "/:id",
    verifyToken,
    productController.deleteProduct
);

module.exports = router;