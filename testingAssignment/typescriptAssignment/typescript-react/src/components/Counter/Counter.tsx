import React, { useState } from "react";
import Button from "./Button";
import Count from "./Count";
import { Container } from "@mui/material";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  const handleClick = (val: number) => {
    setCount(count + val);
  };

  return (
    <Container>
      <Count count={count} />
      <Button label="ADD" onClick={() => handleClick(1)} />
      <Button label="DEC" onClick={() => handleClick(-1)} />
    </Container>
  );
}
