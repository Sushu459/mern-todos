const Todo = require("../models/Todo");

// GET /api/todos
const getTodos = async (req, res, next) => {
  try {
    const { status, search, sortBy = "createdAt", sortOrder = "desc" } =
      req.query;

    const query = { user: req.user._id };

    if (status) query.status = status;
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const todos = await Todo.find(query).sort(sort);
    return res.json(todos);
  } catch (err) {
    console.error("Get todos error:", err);
    next(err);
  }
};

// POST /api/todos
const createTodo = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const validPriorities = ["low", "medium", "high"];
    let normalizedPriority = "medium";

    if (priority && typeof priority === "string") {
      const lower = priority.toLowerCase();
      if (validPriorities.includes(lower)) {
        normalizedPriority = lower;
      }
    }

    let parsedDueDate = null;
    if (dueDate) {
      const d = new Date(dueDate);
      if (!isNaN(d.getTime())) {
        parsedDueDate = d;
      }
    }

    const todo = await Todo.create({
      user: req.user._id,
      title: title.trim(),
      description: description || "",
      priority: normalizedPriority,
      dueDate: parsedDueDate,
    });

    return res.status(201).json(todo);
  } catch (err) {
    console.error("Create todo error:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};

// PATCH /api/todos/:id
const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    const fields = ["title", "description", "priority", "status", "dueDate"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === "dueDate" && req.body[field]) {
          const d = new Date(req.body[field]);
          if (!isNaN(d.getTime())) {
            todo[field] = d;
          }
        } else {
          todo[field] = req.body[field];
        }
      }
    });

    const updated = await todo.save();
    return res.json(updated);
  } catch (err) {
    console.error("Update todo error:", err);
    next(err);
  }
};

// PATCH /api/todos/:id/toggle-status
const toggleTodoStatus = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    todo.status = todo.status === "completed" ? "pending" : "completed";
    const updated = await todo.save();
    return res.json(updated);
  } catch (err) {
    console.error("Toggle status error:", err);
    next(err);
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete todo error:", err);
    next(err);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
};
