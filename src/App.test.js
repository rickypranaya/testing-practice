import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("input not mounted on initial render", () => {
  render(<App />);
  let inputElement = screen.queryByTestId("task-input");
  expect(inputElement).not.toBeInTheDocument();
});

describe("after mounted", () => {
  beforeEach(() => {
    render(<App />);
    let buttonElement = screen.getByTestId("show-button");
    fireEvent.click(buttonElement);
  });

  const unMount = () => {
    let buttonElement = screen.getByTestId("show-button");
    fireEvent.click(buttonElement);
  };

  const addTask = (value) => {
    let inputElement = screen.queryByTestId("task-input");
    let addButtonElement = screen.getByTestId("add-button");
    fireEvent.change(inputElement, { target: { value: value } });
    fireEvent.click(addButtonElement);
  };

  test("input mounted on initial render and message is 'rendered'", () => {
    let inputElement = screen.queryByTestId("task-input");
    expect(inputElement).toBeInTheDocument();
    expect(screen.getByTestId("input-message")).toHaveTextContent("rendered");
  });

  test("list is added to the task lists", () => {
    addTask("learn redux");

    let listElement = screen.queryByTestId("task-lists-0");
    expect(listElement).toHaveTextContent("learn redux");
  });

  test("input is unmounted when hide is clicked", () => {
    let inputElement = screen.queryByTestId("task-input");

    expect(inputElement).toBeInTheDocument();
    unMount();
    expect(inputElement).not.toBeInTheDocument();
  });

  test("list is empty when input is unmounted", () => {
    addTask("learn redux");
    unMount();
    let listElement = screen.queryByTestId("task-lists-0");
    expect(listElement).not.toBeInTheDocument();
  });

  test("tasks list will be completed when clicked", () => {
    addTask("learn redux");
    let listElement = screen.queryByTestId("task-lists-0");
    fireEvent.click(listElement);
    expect(listElement.className).toBe("list completed");
  });

  test("tasks list won't be updated if id is different", () => {
    addTask("learn redux");
    addTask("learn router");

    let listElement1 = screen.queryByTestId("task-lists-0");
    let listElement2 = screen.queryByTestId("task-lists-1");

    fireEvent.click(listElement2);

    expect(listElement1.className).not.toBe("list completed");
  });
});
