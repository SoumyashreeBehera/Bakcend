import React from "react";
import { Button } from "@mui/material";

interface iButtonProps {
  label: string;
  onClick: () => void;
}

function ButtonEL({ label, onClick }: iButtonProps) {
  return (
    <Button
      style={{ margin: "10px 10px" }}
      onClick={onClick}
      variant="outlined"
    >
      {label}
    </Button>
  );
}

export default ButtonEL;
