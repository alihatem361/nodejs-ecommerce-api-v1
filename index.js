import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer"; // إضافة multer للتعامل مع form-data
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./middlewares/errorMiddleware.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRouter.js";
import brandRoutes from "./routes/brandRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

// Connect to database (لازم يتعمل قبل تشغيل السيرفر)
connectDB();

const app = express();
const port = process.env.PORT || 3028;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إعداد multer للتعامل مع form-data (لو هتستخدم رفع ملفات)
const upload = multer();

app.use(express.static('public')); // Add this line to serve static files

app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our e-commerce API",
  });
});

app.use("/api/v1/users", userRoutes); // تعديل عشان يكون كل Route واضح
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/subcategories", subcategoryRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/products", productRoutes);

// @desc    Route not found handler
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// @desc    Error handler middleware
app.use(errorHandler);

// Start server
const server = app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
