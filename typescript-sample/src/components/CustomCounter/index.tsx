import { useState } from "react";
import "../../App.css";

interface CounterProps {
  count: number;
}

const CustomCounter = ({ count }: CounterProps) => {
  return (
    <div className="counter-card">
      <p>count is {count}</p>
    </div>
  );
};

export default CustomCounter;
