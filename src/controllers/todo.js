const Todo = require("../models/Todo");
const { errorResponse } = require("../utils/errorResponse");

// Get All Todos
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();

    return res.json({ count: todos.length, todos });
  } catch (error) {
    next(error);
  }
};

// Get One Todo by ID
const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return errorResponse(res, 404, "Invalid Todo ID! Todo Not Found!");
    }

    return res.json({ todo });
  } catch (error) {
    next(error);
  }
};

// Create New Todo
const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);

    return res.status(201).json({ todo });
  } catch (error) {
    next(error);
  }
};

// Update Todo Status
const updateTodoStatus = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return errorResponse(res, 404, "Invalid Todo ID! Todo Not Found!");
    }

    todo.status = !todo.status;
    await todo.save();

    return res.json({ todo });
  } catch (error) {
    next(error);
  }
};

// Delete Todo by ID
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return errorResponse(res, 404, "Invalid Todo ID! Todo Not Found!");
    }

    await todo.delete();
    return res.json({ deleted: true, deletedTodo: todo });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodoStatus,
  deleteTodo,
};
