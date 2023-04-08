const express = require('express')
const router = express.Router();
const file_check = require('../middleware/file_check');
const productController = require('../controllers/productController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const authCheck = require('../middleware/check_auth');


const methodNotAllowed = (req, res) => res.status(405).json({ 'message': 'method not allowed' });




router.route('/').get(productController.getProducts).all(methodNotAllowed);
router.route('/api/product/:id').get(productController.getProductById).all(methodNotAllowed);
router.route('/api/product_create').post(authCheck.checkAdmin, file_check.file_check, productController.addProduct).all(methodNotAllowed);

router.route('/api/product_update/:id').patch(file_check.update_file_check, productController.updateProduct).all(methodNotAllowed);

router.route('/api/product_remove/:id').delete(authCheck.checkAdmin, productController.removeProduct).all(methodNotAllowed);




module.exports = router;




