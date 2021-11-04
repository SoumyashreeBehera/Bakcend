import React from "react";

interface iCountProps {
  count: number;
}

function Count({ count }: iCountProps) {
  return <h1>{count}</h1>;
}

export default Count;
