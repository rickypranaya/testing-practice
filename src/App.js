import "./App.css";
import React, { useState } from "react";
import CompClass from "./components/CompClass";
import CompFunc from "./components/CompFunc";

function App() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <button data-testid="show-button" onClick={() => setShow((s) => !s)}>
        {show ? "hide" : "show"}
      </button>
      {show && <CompFunc setTodos={setTodos} todos={todos} />}
      {show && <CompClass setTodos={setTodos} todos={todos} />}
    </div>
  );
}

export default App;
