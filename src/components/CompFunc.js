import React, { useState, useEffect } from "react";
import { v4 } from "uuid";

function CompFunc({ setTodos, todos }) {
  const [todo, setTodo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("updated");
  }, [todo]);

  useEffect(() => {
    setMessage("rendered");
    return () => {
      setTodos([]);
    };
  }, []);

  const addTodo = () => {
    setTodos([...todos, { id: v4(), task: todo, completed: false }]);
    setTodo("");
  };

  return (
    <div>
      <div data-testid="input-message">{message}</div>
      <input
        data-testid="task-input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="add new task"
      />
      <button data-testid="add-button" onClick={addTodo}>
        Add
      </button>
    </div>
  );
}

export default CompFunc;
