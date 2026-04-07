import mongoose, { mongo } from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    size: {
      type: String,
    },
    weight: {
      type: String,
    },
    ram: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    coutInStock: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const CartProductModel = mongoose.model("CartProduct", cartProductSchema);

export default CartProductModel;
