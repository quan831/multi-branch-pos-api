const productRepository = require("../repositories/product.repository");
const { Branch, Inventory } = require("../models/associations");

const getAllProducts = async (page, limit) => {
    return await productRepository.getAllProducts(page, limit);
};

const getProductById = async (id) => {
    return await productRepository.getProductById(id);
};

const createProduct = async (productData) => {
    // 1. Gọi Repository để lưu sản phẩm
    const product = await productRepository.createProduct(productData);
    
    // 2. Logic nghiệp vụ: Khởi tạo tồn kho (Inventory) cho tất cả chi nhánh
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
        throw new Error("Failed to initialize inventory for product");
    }
    
    return product;
};

const updateProduct = async (id, productData) => {
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