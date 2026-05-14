const productRepository = require("../repositories/product.repository");

const getAllProducts = async (page, limit) => {
    return await productRepository.getAllProducts(page, limit);
};

const getProductById = async (id) => {
    return await productRepository.getProductById(id);
};

const createProduct = async (productData) => {
    if (!productData.name) {
        throw new Error("Name is required");
    }
    if (productData.price === undefined || productData.price <= 0) {
        throw new Error("Price must be greater than 0");
    }
    return await productRepository.createProduct(productData);
};

const updateProduct = async (id, productData) => {
    if (productData.name !== undefined && !productData.name) {
        throw new Error("Name cannot be empty");
    }
    if (productData.price !== undefined && productData.price <= 0) {
        throw new Error("Price must be greater than 0");
    }
    return await productRepository.updateProduct(id, productData);
};

const deleteProduct = async (id) => {
    return await productRepository.deleteProduct(id);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};