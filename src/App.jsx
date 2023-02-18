import { useState } from "react";
import "./App.css";
import Counter from "./components/Counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>CHEF COOTS</div>
      <Counter />
    </div>
  );
}

export default App;
