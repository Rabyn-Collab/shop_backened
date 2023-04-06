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




module.exports.addProduct = async (req, res) => {
  try {
    await Product.create(req.body);
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
