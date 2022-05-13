import React, { Component } from "react";

class CompClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      message: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { total: props.todos.length };
  }

  componentDidMount() {
    this.setState({
      message: "component mounted",
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.message === "change") {
      this.setState({
        message: "stop updating",
      });
      return false;
    }
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return "snapshot";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("updated");
  }

  componentWillUnmount() {
    this.props.setTodos([]);
  }

  updateTask(id) {
    let updatedTask = this.props.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.props.setTodos(updatedTask);
  }

  render() {
    return (
      <div>
        <button
          data-testid="change-message"
          onClick={() => this.setState({ message: "change" })}
        >
          change message
        </button>
        <div data-testid="class-message">{this.state.message}</div>
        <div data-testid="total">total:{this.state.total}</div>
        <div>
          {this.props.todos.map((todo, index) => (
            <div
              data-testid={`task-lists-${index}`}
              onClick={() => this.updateTask(todo.id)}
              key={todo.id}
              className={todo.completed ? "list completed" : "list"}
            >
              {todo.task}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CompClass;
