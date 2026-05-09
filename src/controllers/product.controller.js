const productService = require("../services/product.service");

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await productService.updateProduct(id, req.body);

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await productService.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};