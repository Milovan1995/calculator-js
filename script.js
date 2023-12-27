//selecting elements
const upperCalcScreen = document.querySelector(".upperScreen");
const lowerCalcScreen = document.querySelector(".lowerScreen");

////////////////////////////////////
//calc function
const calculator = () => {
  let num1 = "0";
  let result = 0;
  let operation;

  const add = () => (result += parseInt(num1));
  const subtract = () => (result -= parseInt(num1));
  const multiply = () => (result *= parseInt(num1));
  const divide = () =>
    num1 == 0
      ? alert("Error, can't divide with 0")
      : (result /= parseInt(num1));
  const modulo = () => {
    num1 == 0
      ? alert("Can't calculate modulo with 0")
      : (result %= parseInt(num1));
  };
  const operate = (chosenOperation) => {
    switch (chosenOperation) {
      case "+":
        return add();
      case "-":
        return subtract();
      case "*":
        return multiply();
      case "/":
        return divide();
      case "%":
        return modulo();
      //when the operation hasn't been assigned (at start)
      default:
        result = parseInt(num1);
        break;
    }
  };
  const assignNum1 = (newNum) => {
    num1 = num1 === "0" ? `${newNum}` : `${num1}${newNum}`;
  };
  const assignOperation = (newOperation) => {
    operate(operation);
    operation = newOperation;
    num1 = "0";
  };
  const getResult = () => result;
  const getOperation = () => operation;
  const getNum = () => num1;
  return { assignOperation, getResult, getOperation, getNum, assignNum1 };
};
/////////////////////////////////////////////////////////
const calc = calculator();
//////////////////////////////////////////////////////////
const initCalculator = () => {
  const buttonMethods = onButtonClicks();
  displayButtons(buttonMethods);
};
////////////////////////////////////////////////
const displayButtons = (buttonMethods) => {
  const operators = {
    add: "+",
    subtract: "-",
    multiply: "*",
    divide: "/",
    modulo: "%",
    equals: "=",
  };
  for (let i = 0; i < 10; i++) {
    const button = document.createElement("button");
    button.classList.add("numButton");
    button.innerHTML = i;
    button.addEventListener("click", () => {
      buttonMethods.clickNumber(i);
    });
    document.querySelector(".buttons").append(button);
  }
  Object.entries(operators).forEach(([key, operator]) => {
    const button = document.createElement("button");
    button.classList.add("opButton");
    button.id = key;
    button.innerHTML = operator;
    button.addEventListener("click", () => {
      if (key === "equals") {
        buttonMethods.clickEquals();
      } else {
        buttonMethods.clickOperation(operator);
      }
    });
    document.querySelector(".buttons").append(button);
  });
  lowerCalcScreen.innerHTML = calc.getNum();
};
/////////////////////////////////////////////
//function for the calculator screen
const onButtonClicks = () => {
  const clickNumber = (numberInfo) => {
    calc.assignNum1(numberInfo);
    lowerCalcScreen.innerHTML = calc.getNum();
  };
  const clickOperation = (operationInfo) => {
    calc.assignOperation(operationInfo);
    upperCalcScreen.innerHTML = `${calc.getResult()}${calc.getOperation()}`;
    lowerCalcScreen.innerHTML = `${calc.getNum()}`;
  };
  const clickEquals = () => {
    calc.assignOperation(calc.getOperation());
    upperCalcScreen.innerHTML = "";
    lowerCalcScreen.innerHTML = `${calc.getResult()}`;
  };
  return { clickEquals, clickNumber, clickOperation };
};
/////////////////////////////////////
// RUN THE CALCULATOR
initCalculator();
