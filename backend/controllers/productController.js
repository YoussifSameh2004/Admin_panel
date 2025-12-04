import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find().populate('category');
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { name, category, price, stockQty, sku, isAvailable, imageUrl, description } = req.body;

  const product = new Product({
    name,
    category,
    price,
    stockQty,
    sku,
    isAvailable,
    imageUrl,
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stockQty, sku, isAvailable, imageUrl, description } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (name !== undefined) product.name = name;
  if (category !== undefined) product.category = category;
  if (price !== undefined) product.price = price;
  if (stockQty !== undefined) product.stockQty = stockQty;
  if (sku !== undefined) product.sku = sku;
  if (isAvailable !== undefined) product.isAvailable = isAvailable;
  if (imageUrl !== undefined) product.imageUrl = imageUrl;
  if (description !== undefined) product.description = description;

  const updated = await product.save();
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
};
