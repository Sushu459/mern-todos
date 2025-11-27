const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./src/config/db");
const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");

dotenv.config();

const app = express();

// DB
connectDB();

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan("dev"));
app.use(helmet());

// ✅ ROUTES
const authRoutes = require("./src/routes/authRoutes");
const todoRoutes = require("./src/routes/todoRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.get("/", (req, res) => {
  res.json({ message: "ProTask API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes); // 👈 IMPORTANT

// 404 + error handler MUST be after routes
app.use(notFound);
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Allowed origins:", allowedOrigins);
});
