const Order = require('../models/Order');



module.exports.addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddess,
    itemPrice,
    totalPrice
  } = req.body;
  try {
    await Order.create({
      orderItems,
      user: req.userId,
      shippingAddess,
      paymentMethods,
      itemPrice,
      totalPrice
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