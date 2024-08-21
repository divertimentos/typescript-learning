import { useState } from "react";
import "./App.css";
import CustomButton from "./components/CustomButton/CustomButton";
import CustomCounter from "./components/CustomCounter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>TypeScripto</h1>
      <div className="card-container">
        <CustomButton setCount={setCount} />
      </div>

      <div className="counter-card">
        <CustomCounter count={count} />
      </div>
    </>
  );
}

export default App;
