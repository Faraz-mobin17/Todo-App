import { Router } from "express";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  updateTodoById,
} from "../controllers/todo.controller.js";
const router = Router();

router.route("/").get(getAllTodos);
router
  .route("/:id")
  .post(createTodo)
  .patch(updateTodoById)
  .delete(deleteTodoById);

export default router;
