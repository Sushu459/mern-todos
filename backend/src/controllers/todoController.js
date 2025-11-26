const Todo = require("../models/Todo");

// GET /api/todos
// Query: status, priority, search, sortBy, sortOrder
const getTodos = async (req, res) => {
  try {
    const { status, priority, search, sortBy, sortOrder } = req.query;

    const query = { owner: req.user._id };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sortOptions = { createdAt: -1 };

    if (sortBy) {
      const order = sortOrder === "asc" ? 1 : -1;
      sortOptions = { [sortBy]: order };
    }

    const todos = await Todo.find(query).sort(sortOptions);

    res.json(todos);
  } catch (error) {
    console.error("Get todos error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, tags, project } =
      req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      title,
      description,
      status,
      priority,
      dueDate,
      tags,
      project,
      owner: req.user._id,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Create todo error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/todos/:id
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.error("Get todo by id error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const {
      title,
      description,
      status,
      priority,
      dueDate,
      tags,
      project,
    } = req.body;

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    todo.priority = priority ?? todo.priority;
    todo.dueDate = dueDate ?? todo.dueDate;
    todo.tags = tags ?? todo.tags;
    todo.project = project ?? todo.project;

    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    console.error("Update todo error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.deleteOne();

    res.json({ message: "Todo removed" });
  } catch (error) {
    console.error("Delete todo error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/todos/:id/toggle-status
const toggleTodoStatus = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.status = todo.status === "completed" ? "pending" : "completed";

    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    console.error("Toggle todo status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
};
