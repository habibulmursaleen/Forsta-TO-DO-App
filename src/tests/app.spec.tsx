import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import App from "../App";

//cleanup after each test
afterEach(() => cleanup());

describe("TodoApp", () => {
  it("renders app", () => {
    const app = render(<App />);
    expect(app).not.toBeUndefined();
  });

  it("renders initial items", () => {
    render(<App />);
    // first todo verify
    const buybreadTodo = screen.getByTestId("todo1");
    expect(screen.getByText("Buy bread")).toBeDefined();
    expect(buybreadTodo).toBeInTheDocument();
    expect(buybreadTodo).toHaveTextContent("Buy bread");

    // second todo verify
    const buyMilkTodo = screen.getByTestId("todo0");
    expect(screen.getByText("Buy milk")).toBeDefined();
    expect(buyMilkTodo).toBeInTheDocument();
    expect(buyMilkTodo).toHaveTextContent("Buy milk");
  });

  it("should have 2 todo items initially", () => {
    render(<App />);
    const todos = screen.getAllByTestId("parent-todo");
    expect(todos.length).toBe(2);
  });

  it("renders initial first items should be checked or done", () => {
    render(<App />);
    const buyMilkTodo = screen.getByTestId("todoCheckbox0");
    expect(buyMilkTodo).toBeChecked();
  });

  it("does not render unknown items", async () => {
    render(<App />);
    const notTodo = screen.queryByText("Buy Something very unknowm new items");
    expect(notTodo).not.toBeInTheDocument();
  });

  it("renders input field with empty value", async () => {
    render(<App />);
    const inputField = screen.getByTestId("inputField");
    expect(inputField).toBeInTheDocument();
    expect(inputField.getAttribute("value")).toBe("");
  });

  it("renders create button", async () => {
    render(<App />);
    const createButton = screen.getByTestId("create-button");
    expect(createButton).toBeInTheDocument();
  });

  it("creates a new todo at top", async () => {
    render(<App />);
    const createButton = screen.getByTestId("create-button");
    const inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "Buy chips" } });
    fireEvent.click(createButton);

    // first todo to be the new created todo
    const todo = screen.getByTestId("todo0");
    expect(todo.textContent).toBe("Buy chips");

    // todos length should be 3 after creating new todo
    const todos = screen.getAllByTestId("parent-todo");
    expect(todos.length).toBe(3);

    // empty input field afterwards
    expect(inputField.getAttribute("value")).toBe("");
  });

  it("rejects empty string as input", async () => {
    render(<App />);
    const todosInitial = screen.getAllByTestId("parent-todo");

    const createButton = screen.getByTestId("create-button");
    const inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "" } });
    fireEvent.click(createButton);

    const todosNew = screen.getAllByTestId("parent-todo");
    expect(todosInitial.length).toBe(todosNew.length);
  });

  it("renders checkbox", async () => {
    render(<App />);
    const checkbox = screen.getByTestId("todoCheckbox0");
    expect(checkbox).toBeInTheDocument();
  });

  it("marks as done or undone", async () => {
    render(<App />);

    //creates a new todo
    const createButton = screen.getByTestId("create-button");
    const inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "Buy food" } });
    fireEvent.click(createButton);
    expect(screen.getByText("Buy food")).toBeDefined();

    // mark as done
    const buyFood = screen.getByTestId("todoCheckbox0");
    //check
    userEvent.click(buyFood);
    expect(buyFood).toBeChecked();
    //uncheck
    userEvent.click(buyFood);
    expect(buyFood).not.toBeChecked();
  });

  it("renders edit button", async () => {
    render(<App />);
    const editButton = screen.getByTestId("editButton0");
    expect(editButton).toBeInTheDocument();
  });

  it("edits a todo", () => {
    render(<App />);

    //creates todo
    const createButton = screen.getByTestId("create-button");
    const inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "something to edit" } });
    fireEvent.click(createButton);

    // edit todo
    const todoEdit = screen.getByTestId("editButton0");
    fireEvent.click(todoEdit);

    // edit field
    const editField = screen.getByTestId("editField");
    expect(editField).toBeInTheDocument();

    // submit button
    const submitButton = screen.getByTestId("submit-button0");
    expect(submitButton).toBeInTheDocument();
    fireEvent.change(editField, { target: { value: "something edited" } });
    fireEvent.click(submitButton);
    const editedTodo = screen.queryByTestId("todo0");
    expect(editedTodo).toBeInTheDocument();
  });

  it("renders delete button", async () => {
    render(<App />);
    const deleteButton = screen.getByTestId("delete-button0");
    expect(deleteButton).toBeInTheDocument();
  });

  it("deletes a todo", () => {
    render(<App />);

    //creates a new todo
    const createButton = screen.getByTestId("create-button");
    const inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "something to delete" } });
    fireEvent.click(createButton);

    // deletes todo
    const todoDelete = screen.getByTestId("delete-button0");
    fireEvent.click(todoDelete);

    // the length should not increase
    const todos = screen.getAllByTestId("parent-todo");
    expect(todos.length).toBe(2);
  });
});
