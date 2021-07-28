const express = require('express');
const router = express.Router();

// import controller 
const customerController = require('../controllers/customerController');

// import session validator

const authSessionValidator = require('../utils/sessionValidatorUtils')

// CRUD customer routes

router.post('/customer',customerController.postCustomer);

router.get('/customer/single',authSessionValidator.sessionAuthValidator,customerController.getSingleCustomer);

router.get('/customer/all',authSessionValidator.adminSessionAuthValidator,customerController.getAllCustomer)

router.post('/customer/update',authSessionValidator.sessionAuthValidator,customerController.updateCustomer);

router.patch('/customer/status/update',authSessionValidator.sessionAuthValidator,customerController.updateCustomerStatus);

router.delete('/customer/:customerId',authSessionValidator.adminSessionAuthValidator,customerController.deleteCustomer);






// login routes
router.post('/customer/login',customerController.postLoginCustomer);

module.exports = router;