const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// All todo routes require auth
router.use(protect);

// GET /api/todos
// POST /api/todos
router.route("/")
  .get(getTodos)     // 👈 this is defined now
  .post(createTodo);

// PATCH /api/todos/:id
// DELETE /api/todos/:id
router.route("/:id")
  .patch(updateTodo)
  .delete(deleteTodo);

// PATCH /api/todos/:id/toggle-status
router.patch("/:id/toggle-status", toggleTodoStatus);

module.exports = router;
