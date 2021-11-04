import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { Stack } from "@mui/material";

interface TodoItemProps {
  title: string;
  id: number;
  status: boolean;
}

export default function Todo() {
  const [data, setData] = useState<TodoItemProps[]>([]);

  const handleAdd = (title: string) => {
    const payload: TodoItemProps = {
      title,
      id: data.length + 1,
      status: false,
    };
    setData([...data, payload]);
  };
  return (
    <div>
      <TodoInput onClick={handleAdd} />
      {data.map((task) => (
        <Stack spacing={2} key={task.id}>
          <TodoItem {...task}></TodoItem>
        </Stack>
      ))}
    </div>
  );
}
