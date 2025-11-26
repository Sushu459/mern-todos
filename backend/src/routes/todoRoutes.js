const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} = require("../controllers/todoController");

// All routes below are protected
router.use(protect);

// GET /api/todos
router.get("/", getTodos);

// POST /api/todos
router.post("/", createTodo);

// GET /api/todos/:id
router.get("/:id", getTodoById);

// PUT /api/todos/:id
router.put("/:id", updateTodo);

// DELETE /api/todos/:id
router.delete("/:id", deleteTodo);

// PATCH /api/todos/:id/toggle-status
router.patch("/:id/toggle-status", toggleTodoStatus);

module.exports = router;
