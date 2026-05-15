const productRepository = require("../repositories/product.repository");
const { Branch, Inventory } = require("../models/associations");

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
    
    const product = await productRepository.createProduct(productData);
    
    // Initialize inventory for all branches
    try {
        const branches = await Branch.findAll();
        const inventoryRecords = branches.map(branch => ({
            productId: product.id,
            branchId: branch.id,
            quantity: 0
        }));
        await Inventory.bulkCreate(inventoryRecords);
    } catch (error) {
        console.error("Error initializing inventory for new product:", error);
        // We don't throw here to avoid failing product creation if inventory fails,
        // though in a production app we'd probably use a transaction.
    }
    
    return product;
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