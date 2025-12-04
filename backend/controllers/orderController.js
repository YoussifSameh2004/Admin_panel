import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('items.product', 'name');
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const { items, customerInfo } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  // calculate total
  let totalPrice = 0;
  for (const item of items) {
    totalPrice += item.price * item.qty;
  }

  const order = new Order({
    user: req.user._id,
    items,
    totalPrice,
    customerInfo,
  });

  const createdOrder = await order.save();

  // decrease stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stockQty: -item.qty },
    });
  }

  res.status(201).json(createdOrder);
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status || order.status;
  const updated = await order.save();
  res.json(updated);
};
