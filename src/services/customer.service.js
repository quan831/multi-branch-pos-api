const customerRepository = require("../repositories/customer.repository");



const getAllCustomers = async () => {
    return await customerRepository.getAllCustomers();
};

const getCustomerById = async (id) => {
    return await customerRepository.getCustomerById(id);
};

const createCustomer = async (customerData) => {

    return await customerRepository.createCustomer(customerData);
};

const updateCustomer = async (id, customerData) => {

    return await customerRepository.updateCustomer(
        id,
        customerData
    );
};

const deleteCustomer = async (id) => {
    return await customerRepository.deleteCustomer(id);
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};