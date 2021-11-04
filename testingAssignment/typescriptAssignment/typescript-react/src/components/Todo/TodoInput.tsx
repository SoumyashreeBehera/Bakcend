import React, { useState } from "react";
import { TextField, Stack, Button, Container } from "@mui/material";

interface iTodoInoutProps {
  onClick: (value: string) => void;
}

export default function TodoInput({ onClick }: iTodoInoutProps) {
  const [state, setState] = useState<string>("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setState(e.target.value);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (state === "") return;
    onClick(state);
    setState("");
  };

  return (
    <Container>
      <Stack direction="row" spacing={2} style={{ justifyContent: "center" }}>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          value={state}
          onChange={handleChange}
        />
        <Button onClick={handleClick} variant="outlined">
          ADD TASK
        </Button>
      </Stack>
    </Container>
  );
}
