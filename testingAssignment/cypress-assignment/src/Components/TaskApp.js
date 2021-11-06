import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { addTask, getTasks } from "./api";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState(false);
  const onTaskChange = (e) => {
    setTask(e.target.value);
  };

  const onTaskSubmit = async (e) => {
    e.preventDefault();
    let newTask = {
      id: todos.length + 1,
      taskName: task,
      isCompleted: false,
    };
    try {
      // setError(false);
      let res = await addTask(newTask);
      setTodos([...todos, res.data]);
      setTask("");
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    let fun = async () => {
      try {
        let res = await getTasks();
        setTodos(res.data);
      } catch (err) {
        setError(true);
      }
    };
    fun();
  }, []);
  return (
    <Router>
      <div className="container-fluid text-center">
        <header className="p-2">
          <h1>Tasks</h1>
          {error && <h3 className="error-id ">error</h3>}

          <TaskForm
            value={task}
            onChange={onTaskChange}
            onSubmit={onTaskSubmit}
          />
        </header>
        <section className="mt-2">
          <TaskList todos={todos} />
        </section>
      </div>
    </Router>
  );
};

export default TodoApp;
