import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    usreid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: "string",
      required: [true, "Please provide name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "sku",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    image: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductSchema);
