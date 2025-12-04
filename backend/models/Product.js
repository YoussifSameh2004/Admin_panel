import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: { type: Number, required: true },
    stockQty: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true },
    isAvailable: { type: Boolean, default: true },
    imageUrl: String,
    description: String,
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
