import React from "react";

const TaskForm = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      autoFocus
      value={value}
      onChange={onChange}
      className="p-2 rounded border task-input"
      placeholder="Add something?"
    />
  </form>
);

export default TaskForm;
