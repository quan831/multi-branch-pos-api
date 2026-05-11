const Customer = require("../models/customer.model");

const getAllCustomers = async () => {
    return await Customer.findAll();
};

const getCustomerById = async (id) => {
    return await Customer.findByPk(id);
};

const createCustomer = async (customerData) => {
    return await Customer.create(customerData);
};

const updateCustomer = async (id, customerData) => {
    const customer = await Customer.findByPk(id);

    if (!customer) {
        return null;
    }

    await customer.update(customerData);

    return customer;
};

const deleteCustomer = async (id) => {
    const customer = await Customer.findByPk(id);

    if (!customer) {
        return null;
    }

    await customer.destroy();

    return true;
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};