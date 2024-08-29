import "../../App.css";

interface I {
  setCount: (prev: number) => void;
}

const handleIncrease = () => {
  return (currValue: number) => currValue + 1;
};

const CustomButton = ({ setCount }: I) => {
  return (
    <>
      <div className="card">
        <button onClick={handleIncrease}>Increase</button>
      </div>
      <div className="card">
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </>
  );
};

export default CustomButton;
