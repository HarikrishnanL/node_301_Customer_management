const Customer = require('../models/CustomerModel');
const Utils = require('../utils/utils');
const customerCustomMessages = require("../domain/customMessages/customer");

exports.getAllCustomer = async (pageSize, pageIndex, sortingKey, sortingPriorty) => {
    try {
        let order = [[sortingKey, sortingPriorty]];
        let paginate = {
            offset: (pageIndex - 1) * pageSize,
            limit: pageSize,
        }
        const customers = await Customer.findAndCountAll({
            attributes: { exclude: ['password', 'token'] },
            order,
            distinct: true,
            ...paginate
        });
        const paginateData = {
            totalCount: customers.count,
            totalPages: Math.ceil(customers.count / pageSize),
            pageSize,
            pageIndex
        }
        if (customers.rows.length > 0) {
            return { response: customers.rows, "paginateData": paginateData }
        } else {
            return new Error(customerCustomMessages.errorMessages.CUSTOMER_RECORDS_NOT_FOUND);
        }
    } catch (error) {
        console.log("error in service file ", error)
        throw error;
    }


}

exports.getSingleCustomer = async (customerId) => {
    try {
        const customer = await Customer.findOne({ attributes: { exclude: ['password', 'token'] }, where: { "id": customerId } });
        if (customer) {
            return customer;
        } else {
            return new Error(customerCustomMessages.errorMessages.CUSTOMER_RECORDS_NOT_FOUND)
        }

    } catch (error) {
        console.log("error in service file ", error)
        throw error;
    }

}

exports.postCustomer = async (body) => {
    try {
        const customer = await Customer.findOne({ where: { email: body.email } });
        if (customer) {
            throw new Error(customerCustomMessages.errorMessages.CUSTOMER_ALREADY_EXISTED);
        } else {
            const hashedPassword = await Utils.encryptPassword(body.password);
            body.password = hashedPassword;
            const newCustomer = await Customer.create(body);
            return newCustomer;
        }
    } catch (error) {
        // winston log error 
        // express - validators 

        console.log("error in service file ", error)
        throw error;
    }
}

exports.deleteCustomer = async (customerId) => {
    try {
        const customer = await Customer.destroy({ where: { "id": customerId } })
        return true;

    } catch (error) {
        console.log("error in service file ", error)
        throw error;
    }

}

exports.updateCustomer = async (customerId, body) => {
    try {
        const updateCustomer = await Customer.update(body, { where: { "id": customerId } });
        if (updateCustomer[0] === 1) {
            return true;
        } else {
            throw new Error(customerCustomMessages.errorMessages.FAILED_UPDATE_CUSTOMER_DETAILS)
        }
    } catch (error) {
        console.log("error in service file ", error)
        throw error;
    }
}

exports.updateCustomerStatus = async (customerId, body) => {
    try {
        const updateCustomerStatus = await Customer.update({ status: body.status }, { where: { "id": customerId } });
        if (updateCustomerStatus[0] === 1) {
            return true;
        } else {
            throw new Error(customerCustomMessages.errorMessages.FAILED_UPDATE_CUSTOMER_STATUS)
        }

    } catch (error) {
        console.log("error in service file ", error)
        throw error;
    }
}