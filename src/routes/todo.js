var express = require("express");
var router = express.Router();

// Todo Controllers Import
const {
  getAllTodos,
  getTodo,
  updateTodoStatus,
  createTodo,
  deleteTodo,
} = require("../controllers/todo");

/* Todo Routes */
router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodoStatus);
router.delete("/:id", deleteTodo);

module.exports = router;
