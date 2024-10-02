import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();

// استخدام الميدل وير morgan لتسجيل السجلات
app.use(morgan("dev")); // يمكنك استخدام "tiny" أو "dev" أيضًا حسب احتياجك

dotenv.config();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World! 🌍" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
