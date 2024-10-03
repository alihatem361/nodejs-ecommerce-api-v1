import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import logger from "./middlewares/logger.js";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./middlewares/errorMiddleware.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(logger);

// Connect to database
connectDB();

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);

// @desc    Route not found handler
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// @desc    Error handler middleware
app.use(errorHandler);

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server & exit process
  server.close(() => process.exit(1));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
