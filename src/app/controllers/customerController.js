const customerService = require("../services/customerService");
const customerLoginService = require("../services/customerLoginService");
const customerCustomMessages = require("../domain/customMessages/customer");
const CustomerModel = require("../models/CustomerModel");

exports.postLoginCustomer = async (req, res) => {
    try {
        const customerTokenDetails = await customerLoginService.customerLogin(req.body);

        return res.status(201).json({ message: customerCustomMessages.successMessages.LOGIN_SUCCESSFUL, "response": customerTokenDetails })

    } catch (error) {
        return res.status(400).json({
            message: customerCustomMessages.errorMessages.CUSTOMER_UNAUTHORIZED,
            error: error
        })
    }
}

exports.postCustomer = async (req, res) => {
    try {
        const customer = await customerService.postCustomer(req.body);
        return res.status(201).json(
            {
                Message: customerCustomMessages.successMessages.CUSTOMER_CREATED,
                response: { id: customer.id, name: customer.name }
            }
        )

    } catch (error) {

        return res.status(406)
            .json(
                {
                    message: customerCustomMessages.errorMessages.CUSTOMER_ALREADY_EXISTED,
                    error: error
                }
            )
    }
}

exports.getSingleCustomer = async (req, res) => {
    try {
        const customerDetails = await customerService.getSingleCustomer(req.params.customerId);
        return res.status(200).json({ Message: customerCustomMessages.successMessages.CUSTOMER_RECORDS_FOUND, Response: customerDetails })
    } catch (error) {

        return res.status(406)
            .json(
                {
                    message: customerCustomMessages.errorMessages.CUSTOMER_RECORDS_NOT_FOUND,
                    error: error
                }
            )
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        await customerService.deleteCustomer(req.params.customerId);
        return res.status(200).json({ Message: customerCustomMessages.successMessages.CUSTOMER_RECORDS_SUCCESSFULLY_DELETED })

    } catch (error) {

        return res.status(417)
            .json(
                {
                    message: customerCustomMessages.errorMessages.FAILED_DELETE_CUSTOMER,
                    error: error
                }
            )
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const customerUpdate = await customerService.updateCustomer(req.user.id, req.body);
        if (customerUpdate) {
            return res.status(200).json({ Message: customerCustomMessages.successMessages.CUSTOMER_RECORDS_SUCCESSFULLY_UPDATED })
        }
    } catch (error) {
        return res.status(417)
            .json(
                {
                    message: customerCustomMessages.errorMessages.FAILED_UPDATE_CUSTOMER_DETAILS,
                    error: error
                }
            )
    }
}

exports.updateCustomerStatus = async (req, res) => {
    try {
        const customerStatusUpdate = await customerService.updateCustomerStatus(req.user.id, req.body)
        if (customerStatusUpdate) {
            return res.status(200).json({ Message: customerCustomMessages.successMessages.CUSTOMER_STATUS_SUCCESFULLY_UPDATED })
        }
    } catch (error) {
        return res.status(417)
            .json(
                {
                    message: customerCustomMessages.errorMessages.FAILED_UPDATE_CUSTOMER_STATUS,
                    error: error
                }
            )
    }
}

exports.getAllCustomer = async (req, res) => {
    try {
        let { size, index, key, sortingPriority } = req.query;
        size = size ? size : 10;
        index = index && index > 0 ? index : 1;
        key = key ? key : "name";
        sortingPriority = sortingPriority ? sortingPriority : "ASC";
        customersDetails = await customerService.getAllCustomer(size, index, key, sortingPriority);
        return res.status(302).json(
            {
                Message: customerCustomMessages.successMessages.CUSTOMER_RECORDS_FOUND,
                response: customersDetails.response,
                paginateData: customersDetails.paginateData
            }
        )

    } catch (error) {
        return res.status(404)
            .json(
                {
                    message: customerCustomMessages.errorMessages.CUSTOMER_RECORDS_NOT_FOUND,
                    error: error
                }
            )
    }
}

