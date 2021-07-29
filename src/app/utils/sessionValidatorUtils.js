const JwtAuthUtils = require('../utils/jwtAuthUtils');
const Customer = require('../models/CustomerModel');
const customerCustomMessages = require('../domain/customMessages/customer')

exports.sessionAuthValidator = async (req, res, next) => {
    try {
        let token = req.header('authToken');
        if (token) {
            let payload = JwtAuthUtils.decode(token, process.env.kJWTSecret);
            let customer = await Customer.findOne({ where: { email: payload.email } });

            if (customer) {
                 req.user = {
                     id:customer.id,
                     email:customer.email,
                     number:customer.phoneNumber
                 }
                return next();
            } else {
                return res.status(404).json({ message: customerCustomMessages.errorMessages.CUSTOMER_UNAUTHORIZED });
            }
        } else {
            return res.status(500).json({ message: customerCustomMessages.errorMessages.AUTHTOKEN_REQUIRED });
        }
    } catch (error) {
        throw error;
    }
}

exports.adminSessionAuthValidator = async (req, res, next) => {
    try {
        let token = req.header('authToken');
        if (token) {
            let payload = JwtAuthUtils.decode(token, process.env.kJWTSecret);
            let customer = await Customer.findOne({ where: { email: payload.email } });
            if (customer && customer.role === 'Admin') {
                req.user = {
                    id:customer.id,
                    email:customer.email,
                    number:customer.phoneNumber
                }
                return next();

            } else {
                return res.status(404).json({ message: customerCustomMessages.errorMessages.CUSTOMER_UNAUTHORIZED });
            }
        } else {
            return res.status(500).json({ message: customerCustomMessages.errorMessages.AUTHTOKEN_REQUIRED });
        }
    }
    catch (error) {
        throw error;
    }
}
