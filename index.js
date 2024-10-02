import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();

// استخدام الميدل وير morgan لتسجيل السجلات
app.use(morgan("dev")); // يمكنك استخدام "tiny" أو "dev" أيضًا حسب احتياجك

dotenv.config();
const port = process.env.PORT || 3000;

// توصيل قاعدة البيانات
mongoose
  .connect(process.env.Database_URL)
  .then((conn) => {
    console.log(`Connected to the database! ${conn.connection.host}`);
  })
  .catch((error) => {
    console.log("Failed to connect to the database!", error);
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello World! 🌍" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
