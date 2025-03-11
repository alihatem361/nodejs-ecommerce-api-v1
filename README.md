# 🛍️ Node.js E-commerce API (v1)

This is a RESTful **E-commerce API** built with **Node.js** and **Express.js**, using **MongoDB** as the database. It supports product management, order handling, user authentication, and JWT-based security.

## 🚀 Features
✅ **Product Management** (Create, Update, Delete, View)  
✅ **Order Management** (Create, Update, Delete)  
✅ **User Authentication** with **JWT**  
✅ **Image Uploads** using **Multer**  
✅ **MongoDB Integration** with **Mongoose**  

## 🛠️ Tech Stack
- **Node.js + Express.js**  
- **MongoDB + Mongoose**  
- **JSON Web Token (JWT)**  
- **Multer (for file uploads)**  

## 📌 How to Run?

### 1️⃣ Clone the repository
```bash
git clone https://github.com/alihatem361/nodejs-ecommerce-api-v1.git
cd nodejs-ecommerce-api-v1
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory and add the following variables:
```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Start the server
```bash
npm start
```

## 📜 API Endpoints

### 📌 Authentication
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → User login  

### 📌 Products
- `GET /api/products` → Get all products  
- `POST /api/products` → Add a new product  

### 📌 Orders
- `GET /api/orders` → Get all orders  
- `POST /api/orders` → Create a new order  

📌 **And more... 🔥**

Feel free to contribute or reach out with any questions! 💬🚀
