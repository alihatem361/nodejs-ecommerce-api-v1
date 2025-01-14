import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a subcategory name"],
      unique: [true, "Subcategory name must be unique"],
      trim: true,
      maxLength: [50, "Subcategory name cannot exceed 50 characters"],
      minlength: [3, "Subcategory name must be at least 3 characters long"],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    // define a relationship between the subcategory and category
    // اضف علاقة بين الفئة الفرعية والفئة
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide a category ID"],
    },
  },
  {
    timestamps: true,
  }
);

const SubcategoryModel = mongoose.model("Subcategory", subcategorySchema);

export default SubcategoryModel;
