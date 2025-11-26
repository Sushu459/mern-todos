const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./src/config/db");
const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middlewares
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());

// Routes
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const todoRoutes = require("./src/routes/todoRoutes");

app.get("/", (req, res) => {
  res.json({ message: "ProTask API is running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
