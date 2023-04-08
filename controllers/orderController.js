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



module.exports.getOrders = async (req, res) => {

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    });
  }

}

module.exports.getOrderById = async (req, res) => {

  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'fullname email'
    );
    res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `something went wrong ${err}`
    });
  }

}


