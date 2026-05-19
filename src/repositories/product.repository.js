const { Product, Inventory } = require("../models/associations");

const getAllProducts = async (page, limit) => {
    const queryOptions = {
        include: [{ model: Inventory, attributes: ['quantity', 'branchId'] }]
    };

    if (page !== undefined && limit !== undefined) {
        queryOptions.limit = limit;
        queryOptions.offset = (page - 1) * limit;
    }

    return await Product.findAll(queryOptions);
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