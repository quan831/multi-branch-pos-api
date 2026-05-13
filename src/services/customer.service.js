const customerRepository = require("../repositories/customer.repository");

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
    return /^\d+$/.test(phone);
};

const getAllCustomers = async () => {
    return await customerRepository.getAllCustomers();
};

const getCustomerById = async (id) => {
    return await customerRepository.getCustomerById(id);
};

const createCustomer = async (customerData) => {
    const {name, phone, email} = customerData;

    if (!name || !phone) {
        throw new Error("Name and phone are required");
    }

    if (!isValidPhone(phone)) {
        throw new Error("Invalid phone number");
    }

    if (email && !isValidEmail(email)
    ) {
        throw new Error("Invalid email");
    }

    return await customerRepository.createCustomer(customerData);
};

const updateCustomer = async (id, customerData) => {
    const {phone, email} = customerData;

    if (phone && !isValidPhone(phone)
    ) {
        throw new Error("Invalid phone number");
    }

    if (email && !isValidEmail(email)
    ) {
        throw new Error("Invalid email");
    }

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