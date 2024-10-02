import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a category name"],
      unique: [true, "Category name must be unique"],
      trim: true,
      maxLength: [50, "Category name cannot exceed 50 characters"],
      minlength: [3, "Category name must be at least 3 characters long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
