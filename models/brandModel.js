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

const setImagesURL = function (doc) {
  if (doc.image && doc.image !== undefined && !doc.image.includes("http")) {
    doc.image = `${process.env.BASE_URL}/images/brands/${doc.image}`;
  }
};

// when a document is initialized with findOne or find
brandSchema.post("init", function (doc) {
  setImagesURL(doc);
});

// with create or update
brandSchema.post("save", function (doc) {
  setImagesURL(doc);
});

const BrandModel = mongoose.model("Brand", brandSchema);

export default BrandModel;
