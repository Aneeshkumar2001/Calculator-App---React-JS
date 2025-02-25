import { useState } from "react";

import logo from "./RCS logo.pdf";

function App() {
  const CalNums = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const opr = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (opr.includes(value) && calc == "") ||
      (opr.includes(value) && opr.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!opr.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };
    
  const evalCalc = () => {
    
    if (calc == "" || opr.includes(calc.slice(-1))) {
      return;
    }
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc == "") {
      return;
    }
    const value = calc.slice(0, -1);

    setCalc(value);
    
    if(!opr.includes(value.slice(-1)) && value.length != 0){
      setResult(eval(value).toString());
    }
    else if(value.length == 0){
      setResult("");
    }
  };
  const deleteAll = () => {
    if (calc == "") {
      return;
    }
    setCalc("");
    setResult("");
  };

  return (
    <div className="root">
      <div className="header">
        <img src={logo} alt="logo" width="30px" />
        <h3>Calculator App</h3>
      </div>
      <div className="App">
        <div className="calculator">
          <div className="display" id="display">
            {result ? <span>({result})</span> : ""}&nbsp; {calc || "0"}
          </div>

          <div className="operators">
            <button onClick={() => updateCalc("/")}>/</button>
            <button onClick={() => updateCalc("*")}>*</button>
            <button onClick={() => updateCalc("+")}>+</button>
            <button onClick={() => updateCalc("-")}>-</button>
            <button onClick={() => deleteLast()}>DEL</button>
            <button onClick={() => deleteAll()}>AC</button>
          </div>
          <div className="digits">
            {CalNums()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>
            <button onClick={() => evalCalc()}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;