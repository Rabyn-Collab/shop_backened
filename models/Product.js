const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });



const productSchema = mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_detail: {
    type: String,
    required: true
  },
  reviews: [reviewSchema],
  product_price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  product_image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },


}, { timestamps: true });



const Product = mongoose.model('Product', productSchema);
module.exports = Product;

