//calc function
const calculator = () => {
  let num1 = "0";
  let result = 0;
  let operation;

  function add() {
    result += parseInt(num1);
  }
  function subtract() {
    result -= parseInt(num1);
  }
  function divide() {
    if (num1 == 0) {
      console.error("can't divide by 0");
      alert("Nope, can't divide by 0");
    } else {
      result /= parseInt(num1);
    }
  }
  function multiply() {
    result *= parseInt(num1);
  }
  function modulo() {
    if (result === 0) {
      console.error("Cant calc modulo with 0");
      alert("Can't calculate modulo with 0");
    } else {
      result %= parseInt(num1);
    }
  }
  function operate(chosenOperation) {
    switch (chosenOperation) {
      case "+":
        add();
        break;
      case "-":
        subtract();
        break;
      case "*":
        multiply();
        break;
      case "/":
        divide();
        break;
      case "%":
        modulo();
        break;
      default:
        result = parseInt(num1);
        break;
    }
  }
  function assignNum1(newNum) {
    num1 = num1 === "0" ? `${newNum}` : `${num1}${newNum}`;
  }
  function assignOperation(newOperation) {
    operate(operation);
    operation = newOperation;
    num1 = "0";
  }
  function getResult() {
    return result;
  }
  function getOperation() {
    return operation;
  }
  function getNum() {
    return num1;
  }
  return { assignOperation, getResult, getOperation, getNum, assignNum1 };
};

function displayButtons(calculatorInstance) {
  //initializing calculator localy inside displayButtons
  calc = calculatorInstance();
  for (let i = 0; i < 10; i++) {
    const button = document.createElement("button");
    button.classList.add("numButton");
    button.innerHTML = i;
    button.addEventListener("click", () => {
      calcDisplay().clickNumber(i);
    });
    document.querySelector(".buttons").append(button);
  }
  //replicating enum like this:
  const operators = {
    add: "+",
    subtract: "-",
    multiply: "*",
    divide: "/",
    modulo: "%",
    equals: "=",
  };

  Object.entries(operators).forEach(([key, operator]) => {
    const button = document.createElement("button");
    button.classList.add("opButton");
    button.id = key;
    button.innerHTML = operator;
    button.addEventListener("click", (e) => {
      if (key === "equals") {
        calcDisplay().clickEquals();
      } else {
        calcDisplay().clickOperation(operator);
      }
    });
    document.querySelector(".buttons").append(button);
  });
  document.querySelector(".lowerScreen").innerHTML = calc.getNum();
}
//Calling displayButtons and  passing calculator function as argument to initialize local instance of calculator
displayButtons(calculator);
//function for the calc screen
const calcDisplay = () => {
  //selecting elements
  const upper = document.querySelector(".upperScreen");
  const lower = document.querySelector(".lowerScreen");

  //   handling events
  function clickNumber(numberInfo) {
    calc.assignNum1(numberInfo);
    lower.innerHTML = calc.getNum();
  }
  function clickOperation(operationInfo) {
    calc.assignOperation(operationInfo);
    upper.innerHTML = `${calc.getResult()}${calc.getOperation()}`;
    lower.innerHTML = `${calc.getNum()}`;
  }
  function clickEquals() {
    calc.assignOperation(calc.getOperation());
    upper.innerHTML = "";
    lower.innerHTML = `${calc.getResult()}`;
  }
  return { clickEquals, clickNumber, clickOperation };
};
