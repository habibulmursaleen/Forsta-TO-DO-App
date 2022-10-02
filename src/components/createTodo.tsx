import React, { useState } from "react";
import "../styles.scss";

type TodoListProps = {
  todos: any[];
  setTodos: Function;
};

export const CreateTodo = ({ todos, setTodos }: TodoListProps) => {
  // hooks to add new todos in the list
  const [newTodo, setNewTodo] = useState("");

  // textfield input handler
  const handleInput = (event) => setNewTodo(event.target.value);

  // create todo handler
  const handleCreate = (event) => {
    // checks if the input is null value
    if (newTodo !== "") {
      setTodos([
        {
          text: newTodo,
          done: false,
          id: new Date().getTime()
        },
        ...todos // sets new task at top
      ]);
      setNewTodo("");
    } else {
      alert("Task can not be empty"); // does not take null value as input
    }
  };

  return (
    <div>
      {/* input field */}
      <input
        type="text"
        className="inputField"
        placeholder="Create a new todo"
        value={newTodo}
        onChange={handleInput}
        data-testid="inputField"
      />
      {/* create button */}
      <button type="submit" onClick={handleCreate} data-testid="create-button">
        Create
      </button>
    </div>
  );
};
