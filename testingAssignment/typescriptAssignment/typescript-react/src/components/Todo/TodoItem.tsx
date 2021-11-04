import React from "react";
import { Container } from "@mui/material";

interface iTodoItemProps {
  title: String;
  id: number;
  status: boolean;
}

export default function TodoItem({ title, id, status }: iTodoItemProps) {
  return (
    <Container style={{ marginTop: "15px" }}>
      {`${title} - ${status}`}
    </Container>
  );
}
