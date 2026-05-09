const branchRepository = require("../repositories/branch.repository");

const getAllBranches = async () => {
    return await branchRepository.getAllBranches();
};

const getBranchById = async (id) => {
    return await branchRepository.getBranchById(id);
};

const createBranch = async (branchData) => {
    return await branchRepository.createBranch(branchData);
};

const updateBranch = async (id, branchData) => {
    return await branchRepository.updateBranch(id, branchData);
};

const deleteBranch = async (id) => {
    return await branchRepository.deleteBranch(id);
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};