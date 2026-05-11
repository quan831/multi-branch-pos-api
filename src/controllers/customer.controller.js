const customerService = require("../services/customer.service");

const getAllCustomers = async (req, res) => {
    try {
        const customers =
            await customerService.getAllCustomers();

        res.status(200).json(customers);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer =
            await customerService.getCustomerById(
                req.params.id
            );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json(customer);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createCustomer = async (req, res) => {
    try {
        const customer =
            await customerService.createCustomer(
                req.body
            );

        res.status(201).json(customer);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer =
            await customerService.updateCustomer(
                req.params.id,
                req.body
            );

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json(customer);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const deleted =
            await customerService.deleteCustomer(
                req.params.id
            );

        if (!deleted) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};