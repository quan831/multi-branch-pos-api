const Branch = require("../models/branch.model");

const getAllBranches = async () => {
    return await Branch.findAll();
};

const getBranchById = async (id) => {
    return await Branch.findByPk(id);
};

const createBranch = async (branchData) => {
    return await Branch.create(branchData);
};

const updateBranch = async (id, branchData) => {
    const branch = await Branch.findByPk(id);

    if (!branch) {
        return null;
    }

    await branch.update(branchData);

    return branch;
};

const deleteBranch = async (id) => {
    const branch = await Branch.findByPk(id);

    if (!branch) {
        return null;
    }

    await branch.destroy();

    return true;
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};