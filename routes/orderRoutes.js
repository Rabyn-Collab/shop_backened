const express = require('express')
const router = express.Router();
const orderController = require('../controllers/orderController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const authCheck = require('../middleware/check_auth');




const methodNotAllowed = (req, res) => res.status(405).json({ 'message': 'method not allowed' });


router.route('/api/order_create').post(authCheck.checkUser, orderController.addOrder).all(methodNotAllowed);

router.route('/api/user/order').get(authCheck.checkUser, orderController.getOrderById).all(methodNotAllowed);

router.route('/api/all/orders').get(authCheck.checkAdmin, orderController.getOrders).all(methodNotAllowed);




module.exports = router;




