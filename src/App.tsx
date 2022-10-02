import React, { useState } from "react";
import { CreateTodo } from "./components/createTodo";
import { TodoList } from "./components/todoList";
import "./styles.scss";

export default function App() {
  // initial todos to be loaded
  const [todos, setTodos] = useState([
    {
      text: "Buy milk",
      done: true,
      id: 1
    },
    {
      text: "Buy bread",
      done: false,
      id: 2
    }
  ]);

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <CreateTodo todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
