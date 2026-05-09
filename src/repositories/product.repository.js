const Product = require("../models/product.model");

const getAllProducts = async () => {
    return await Product.findAll();
};

const getProductById = async (id) => {
    return await Product.findByPk(id);
};

const createProduct = async (productData) => {
    return await Product.create(productData);
};

const updateProduct = async (id, productData) => {
    const product = await Product.findByPk(id);

    if (!product) {
        return null;
    }

    await product.update(productData);

    return product;
};

const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);

    if (!product) {
        return null;
    }

    await product.destroy();

    return true;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};