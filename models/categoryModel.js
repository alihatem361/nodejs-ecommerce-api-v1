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
      trim: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const setImagesURL = function (doc) {
  if (doc.image && doc.image !== undefined && !doc.image.includes("http")) {
    doc.image = `${process.env.BASE_URL}/images/categories/${doc.image}`;
  }
};

// when a document is initialized with findOne or find
categorySchema.post("init", function (doc) {
  setImagesURL(doc);
});

// with create or update
categorySchema.post("save", function (doc) {
  setImagesURL(doc);
});

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
