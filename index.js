import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import logger from "./middlewares/logger.js";

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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
