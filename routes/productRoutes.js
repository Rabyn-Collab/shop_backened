const express = require('express')
const router = express.Router();
const check = require('../middleware/file_check');
const productController = require('../controllers/productController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const authCheck = require('../middleware/check_auth');


const methodNotAllowed = (req, res) => res.status(405).json({ 'message': 'method not allowed' });

const productSchema = Joi.object().keys({
  product_name: Joi.string().required(),
  // product_detail: Joi.string().required(),
  // product_price: Joi.string().required(),
  // brand: Joi.string().required(),
  // category: Joi.string().required(),
  // countInStock: Joi.number().required(),
  product_image: Joi.alternatives('').required()
});




router.route('/').get(productController.getProducts).all(methodNotAllowed);
router.route('/api/product/:id').get(productController.getProductById).all(methodNotAllowed);
router.route('/api/product_create').post(authCheck.checkAdmin, check.file_check, productController.addProduct).all(methodNotAllowed);

router.route('/api/product_update/:id').patch(authCheck.checkAdmin, check.update_file_check, productController.updateProduct).all(methodNotAllowed);

router.route('/api/product_remove/:id').delete(authCheck.checkAdmin, productController.removeProduct).all(methodNotAllowed);

router.route('/api/add_product_review/:id').patch(authCheck.checkUser, productController.createProductReview).all(methodNotAllowed);





module.exports = router;




