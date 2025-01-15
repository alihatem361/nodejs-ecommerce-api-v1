import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a brand name"],
      unique: [true, "Brand name must be unique"],
      trim: true,
      maxLength: [50, "Brand name cannot exceed 50 characters"],
      minlength: [3, "Brand name must be at least 3 characters long"],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const BrandModel = mongoose.model("Brand", brandSchema);

export default BrandModel;
