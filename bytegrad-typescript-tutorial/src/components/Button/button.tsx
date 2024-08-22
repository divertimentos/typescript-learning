import React from "react";

type ButtonProps = {
  backgroundColor: string;
  fontSize: number;
  pillShape?: boolean;
};

export default function Button({
  backgroundColor,
  fontSize,
  pillShape,
}: ButtonProps) {
  return (
    <button className="bg-blue-500 text-white rounded px-4 py-2">
      Click Me
    </button>
  );
}
