import React, { useState } from "react";
import "../styles.scss";

type TodoListProps = {
  todos: any[];
  setTodos: Function;
};

export const TodoList = ({ todos, setTodos }: TodoListProps) => {
  // hooks for edit a todo
  const [editMode, setEditMode] = useState({ state: false, id: null });
  const [editTask, setEditTask] = useState("");

  // deletes a todo
  const handleDelete = (item) => {
    let _todos = todos.filter((element) => element !== item);
    setTodos(_todos);
  };

  // edits a todo
  const handleEditSubmit = (item) => {
    todos.map((todo) => {
      if (todo === item) {
        // checks if the input is null value
        if (editTask !== "") {
          todo.text = editTask;
        } else {
          alert("Task can not be empty"); // does not take null value as input
        }
      }
      return todo;
    });
    // setting edit mode false to return back
    setEditMode({ state: false, id: null });
    setEditTask("");
  };

  // mark as done
  const markDone = (item) => {
    const done = todos.map((todo) => {
      if (todo === item) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setTodos(done);
  };

  return (
    <ul className="todoList">
      {todos.map((item, i) => (
        <>
          <li key={i}>
            {/* checking if the edit mode is enable. 
            "condition ? (true <div>) : (false <div>)" */}
            {editMode.id === item.id ? (
              <div>
                {/* edit field */}
                <input
                  type="text"
                  className="editField"
                  data-testid="editField"
                  value={editTask}
                  // placeholder={editTask}
                  onChange={(event) => setEditTask(event.target.value)}
                />
                {/* submit button */}
                <button
                  type="submit"
                  onClick={() => handleEditSubmit(item)}
                  data-testid={`submit-button${i}`}
                  className="submit"
                >
                  Submit
                </button>

                {/* cancel button */}
                <button
                  className="danger"
                  onClick={() => {
                    setEditMode({ state: false, id: null });
                    setEditTask("");
                  }}
                  data-testid={`cancel-button${i}`}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="task">
                  {/* checkbox for mark as done */}
                  <input
                    type="checkbox"
                    className="larger"
                    onChange={() => markDone(item)}
                    checked={item.done}
                    data-testid={`todoCheckbox${i}`}
                  />
                  <div
                    data-testid="parent-todo"
                    className={item.done ? "todo-text complete" : "todo-text"}
                  >
                    {/* created todo items */}
                    <span data-testid={`todo${i}`}>{item.text}</span>
                  </div>
                </div>
                <div className="actions">
                  {/* edit button */}
                  <button
                    onClick={() => {
                      setEditMode({ state: true, id: item.id });
                      setEditTask(item.text);
                    }}
                    data-testid={`editButton${i}`}
                  >
                    Edit
                  </button>

                  {/* delete button */}
                  <button
                    onClick={() => handleDelete(item)}
                    data-testid={`delete-button${i}`}
                    className="danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        </>
      ))}
    </ul>
  );
};

// function setTodos(_todos: any[]) {
//   throw new Error("Function not implemented.");
// }
