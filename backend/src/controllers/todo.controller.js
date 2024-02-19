import { Todo } from "../model/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// create todo
const createTodo = asyncHandler(async (req, res) => {
  await todo.save(); // save to database
  const todo = new Todo(req.body); // create new todo
  if (!todo) {
    return res.status(400).json(new ApiError(400, "Unable to create Todo"));
  }
  return res
    .status(201)
    .json(new ApiResponse(201, todo, "Todo created successfully"));
});

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  if (!todos) {
    return res.status(400).json(new ApiError(400, "Todos not found"));
  }
  return res.status(200).json(new ApiResponse(200, todos, "Todos found"));
});

const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json(new ApiError(404, "Todo not found"));
  }
  return res.status(200).json(new ApiResponse(200, todo, "Todo found"));
});

const updateTodoById = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json(new ApiError(400, "Invalid request body"));
  }
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!todo) {
    return res.status(404).json(new ApiError(404, "Todo not update"));
  }
  return res.status(200).json(new ApiResponse(200, todo, "Todo updated"));
});

const deleteTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    return res.status(404).json(new ApiError(404, "Todo not found"));
  }
  return res.status(200).json(new ApiResponse(200, todo, "Todo deleted"));
});

export { createTodo, getAllTodos, getTodoById, updateTodoById, deleteTodoById };
