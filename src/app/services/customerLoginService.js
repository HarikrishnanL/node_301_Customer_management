const Customer = require('../models/CustomerModel');
const JwtAuthUtils = require('../utils/jwtAuthUtils');
const Utils = require('../utils/utils');
const customerCustomMessages = require("../domain/customMessages/customer");
const { USER } = require('../config/db.config');

exports.customerLogin = async (body) => {
    try {
        const customer = await Customer.findOne({ where: { email: body.email } });

        if (customer) {
            let passwordCheck = await Utils.comparePassword(body.password, customer.password);
            if (passwordCheck) {
                let token = JwtAuthUtils.sign(
                    {
                        id: customer.id,
                        role: customer.role,
                        name: customer.name,
                        email: customer.email,
                        phoneNumber: customer.phoneNumber

                    }, process.env.kJWTSecret, { expiresIn: "1d" }
                )
                const updateCustomerToken = await Customer.update({ token: token }, { where: { "id": customer.id } })

                if (updateCustomerToken[0] === 1) {
                    let customerTokenDetails = {
                        "customer": {
                            id: customer.id,
                            name: customer.name,
                            email: customer.email,
                            phoneNumber: customer.phoneNumber,
                            role:customer.role
                        }, "token": token
                    };
                    return customerTokenDetails
                }else{
                    throw new Error(customerCustomMessages.errorMessages.FAILED_UPDATE_CUSTOMER_TOKEN)
                }
            } else {
                throw new Error(customerCustomMessages.errorMessages.SUCH_CUSTOMER_DOESNT_EXISTED);
            }
        } else {
            throw new Error(customerCustomMessages.errorMessages.SUCH_CUSTOMER_DOESNT_EXISTED);
        }
    } catch (error) {

    }

}