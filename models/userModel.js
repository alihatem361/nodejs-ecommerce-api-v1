import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "Too short password"],
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const setImagesURL = function (doc) {
  if (doc.profileImg && !doc.profileImg.startsWith("http")) {
    doc.profileImg = `${process.env.BASE_URL}/images/products/${doc.profileImg}`;
  }
};

// when a document is initialized with findOne or find
userSchema.post("init", function (doc) {
  setImagesURL(doc);
});

// with create or update
userSchema.post("save", function (doc) {
  setImagesURL(doc);
});

const User = mongoose.model("User", userSchema);

export default User;
