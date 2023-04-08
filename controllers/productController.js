const mongoose = require('mongoose');
const Product = require('../models/Product');




module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    })
  }
}

module.exports.getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 'error',
        message: 'please provide valid productId'
      });
    }

    const products = await Product.find({ _id: id });
    if (products.length === 0) {
      return res.status(200).json({
        status: 'not found',
        message: 'Product not found'
      });
    }


    return res.status(200).json(products);


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    });
  }
}







module.exports.addProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;
  try {
    await Product.create({
      product_name,
      product_detail,
      product_price,
      brand,
      category,
      countInStock,
      product_image: req.imagePath
    });
    return res.status(201).json({
      status: 'success',
      message: 'successfully created'
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    });
  }
}




module.exports.updateProduct = async (req, res, next) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;

  try {

    await Product.findByIdAndUpdate({ _id: req.params.id }, {
      product_name,
      product_detail,
      product_price,
      brand,
      category,
      countInStock,
      product_image: req.imagePath
    });
    return res.status(201).json({
      status: 'success',
      message: 'successfully updated'
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    });
  }
}




module.exports.removeProduct = async (req, res) => {

  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(401).json({
      status: 'success',
      message: 'successfully removed'
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    })
  }
}


module.exports.getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    return res.status(401).json(products);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    })
  }


}



module.exports.createProductReview = async (req, res) => {
  const { rating, comment } = req.body

  try {

  } catch (err) {

  }
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}