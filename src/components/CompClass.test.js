import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import CompClass from "./CompClass";

afterEach(cleanup);

test("testing getDerivedStateFromProps return the same length array", () => {
  render(
    <CompClass
      setTodos={() => {}}
      todos={[{ id: "24321" }, { id: "rdcsfcs" }, { id: "4324" }]}
    />
  );
  let totalElement = screen.getByTestId("total");
  expect(totalElement).toHaveTextContent(/3/i);
});

test("testing componentDidMount", () => {
  render(<CompClass setTodos={() => {}} todos={[]} />);
  let messageElement = screen.getByTestId("class-message");
  expect(messageElement).toHaveTextContent(/component mounted/i);
});

test("testing shouldComponentUpdate", () => {
  render(<CompClass setTodos={() => {}} todos={[1, 2, 3]} />);
  let messageElement = screen.getByTestId("class-message");
  let changeElement = screen.getByTestId("change-message");
  fireEvent.click(changeElement);
  expect(messageElement).toHaveTextContent(/stop updating/i);
});

test("testing componentDidUpdate", () => {
  console.log = jest.fn();

  render(<CompClass setTodos={() => {}} todos={[]} />);
  let changeElement = screen.getByTestId("change-message");
  fireEvent.click(changeElement);
  expect(console.log).toHaveBeenCalledWith("updated");
});

test("tasks list will be won't be line-through before clicked", () => {
  const { debug } = render(
    <CompClass
      setTodos={() => {}}
      todos={[{ id: 23432, task: "learn redux", completed: false }]}
    />
  );
  let listElement = screen.queryByTestId("task-lists-0");
  expect(listElement.className).toBe("list");
});
