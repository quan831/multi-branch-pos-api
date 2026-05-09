const branchService = require("../services/branch.service");

const getAllBranches = async (req, res) => {
    try {
        const branches = await branchService.getAllBranches();

        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;

        const branch = await branchService.getBranchById(id);

        if (!branch) {
            return res.status(404).json({
                message: "Branch not found"
            });
        }

        res.status(200).json(branch);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createBranch = async (req, res) => {
    try {
        const branch = await branchService.createBranch(req.body);

        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedBranch = await branchService.updateBranch(id, req.body);

        if (!updatedBranch) {
            return res.status(404).json({
                message: "Branch not found"
            });
        }

        res.status(200).json(updatedBranch);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await branchService.deleteBranch(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Branch not found"
            });
        }

        res.status(200).json({
            message: "Branch deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};