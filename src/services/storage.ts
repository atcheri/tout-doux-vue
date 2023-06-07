import { Todo } from "../models/Todo";

const getTodos = (): Todo[] => {
  const todos = localStorage.getItem("todos");
  if (!todos) {
    return [];
  }
  return JSON.parse(todos);
};

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export default {
  getTodos,
  saveTodos,
};
