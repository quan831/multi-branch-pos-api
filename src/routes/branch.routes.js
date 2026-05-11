const express = require("express");

const router = express.Router();

const branchController = require("../controllers/branch.controller");

const {
    verifyToken
} = require("../middlewares/auth.middleware");

router.get("/", verifyToken, branchController.getAllBranches);

router.get("/:id", verifyToken, branchController.getBranchById);

router.post("/", verifyToken, branchController.createBranch);

router.put("/:id", verifyToken, branchController.updateBranch);

router.delete("/:id", verifyToken, branchController.deleteBranch);

module.exports = router;