import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import CompFunc from "./CompFunc";

afterEach(cleanup);

describe("testing component", () => {
  test("input value empty at initial render", () => {
    render(<CompFunc setTodos={() => {}} todos={[]} />);
    let inputElement = screen.getByTestId("task-input");
    expect(inputElement.value).toBe("");
  });

  test("input value should be able to type", () => {
    render(<CompFunc setTodos={() => {}} todos={[]} />);
    let inputElement = screen.getByTestId("task-input");
    fireEvent.change(inputElement, { target: { value: "learn redux" } });
    expect(inputElement.value).toBe("learn redux");
  });

  test("input should be empty after button clicked", () => {
    render(<CompFunc setTodos={() => {}} todos={[]} />);
    let inputElement = screen.getByTestId("task-input");
    let buttonElement = screen.getByTestId("add-button");
    fireEvent.change(inputElement, { target: { value: "learn redux" } });
    fireEvent.click(buttonElement);
    expect(inputElement.value).toBe("");
  });
});

describe("testing functional lifecycle", () => {
  test("message is 'updated' after user typing", () => {
    render(<CompFunc setTodos={() => {}} todos={[]} />);
    let inputElement = screen.getByTestId("task-input");
    fireEvent.change(inputElement, { target: { value: "user typing..." } });
    expect(screen.getByTestId("input-message")).toHaveTextContent("updated");
  });
});
