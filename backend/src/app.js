import { Todo } from "./models/Todo.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://mern-todo-app-client-seven.vercel.app",
    credentials: true,
  })
);
app.use(express.static("public"));

app.get("/todos", async (req, res) => {
  const allTodos = await Todo.find();
  res.json(allTodos);
});

app.post("/todos/new", async (req, res) => {
  const newTask = await Todo.create(req.body);
  res.status(201).json({ newTask });
});

app.delete("/todos/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.put("/todos/update/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json(result);
});

export { app };
