import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import logger from "./middlewares/logger.js";
import ApiError from "./utils/ApiError.js";
import e from "express";
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

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
