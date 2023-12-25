//varijabla const calculator - asignujem anonimnu fju
const calculator = () => {
  let result = 0;

  function add(num) {
    return (result += num);
  }

  function subtract(num) {
    return (result -= num);
  }

  function multiply(num) {
    return (result *= num);
  }

  function divide(num) {
    if (num !== 0) {
      return (result /= num);
    } else {
      console.error("Cannot divide by zero");
      return NaN;
    }
  }

  function modulo(num) {
    if (num !== 0) {
      return (result %= num);
    } else {
      console.error("Cannot calculate modulo by zero");
      return NaN;
    }
  }
  function operate(operator, num) {
    switch (operator) {
      case "+":
        add(num);
        break;
      case "-":
        subtract(num);
        break;
      case "*":
        multiply(num);
        break;
      case "/":
        divide(num);
        break;
      case "%":
        modulo(num);
        break;
      default:
        console.error("Unknown operator");
    }
  }

  function getResult() {
    return result;
  }

  return { operate, getResult };
};

const calcDisplay = () => {
  function clickOperators(elementInnerHTML) {
    //if theres somethin in upper screen
    const valueOnLowerScreen = document.querySelector(".lowerScreen").innerHTML;
    if (!!document.querySelector(".upperScreen").innerHTML.trim()) {
      const operationOnCalcScreen = document
        .querySelector(".upperScreen")
        .innerHTML.slice(-1);
      const valueToUse = parseInt(valueOnLowerScreen);
      calc.operate(operationOnCalcScreen, valueToUse);
      const valueToShow = calc.getResult();
      document.querySelector(
        ".upperScreen"
      ).innerHTML = `${valueToShow}${elementInnerHTML}`;
      console.log(calc.getResult());
      document.querySelector(".lowerScreen").innerHTML = "0";
    } else {
      calc.operate(
        "+",
        parseInt(document.querySelector(".lowerScreen").innerHTML)
      );
      document.querySelector(
        ".upperScreen"
      ).innerHTML = `${valueOnLowerScreen}${elementInnerHTML}`;
      document.querySelector(".lowerScreen").innerHTML = "0";
    }
  }
  function clickEquals() {
    const operationOnCalcScreen = document
      .querySelector(".upperScreen")
      .innerHTML.slice(-1);
    const valueToUse = parseInt(
      document.querySelector(".lowerScreen").innerHTML
    );
    calc.operate(operationOnCalcScreen, valueToUse);
    document.querySelector(".upperScreen").innerHTML = "";
    document.querySelector(".lowerScreen").innerHTML = `${calc.getResult()}`;
  }
  function clickNumbers(buttonId) {
    const currentNumberOnScreen =
      document.querySelector(".lowerScreen").innerHTML;
    let wantedNumberOnScreen;
    if (
      document.querySelector(".lowerScreen").innerHTML.length == 1 &&
      document.querySelector(".lowerScreen").innerHTML == "0"
    ) {
      wantedNumberOnScreen = `${buttonId}`;
      hasNumberBeenClicked = true;
    } else {
      wantedNumberOnScreen = `${currentNumberOnScreen}${buttonId}`;
    }

    document.querySelector(".lowerScreen").innerHTML = wantedNumberOnScreen;
  }
  return { clickOperators, clickEquals, clickNumbers };
};

const calc = calculator();
document.querySelector(".lowerScreen").innerHTML = calc.getResult();

for (let i = 0; i < 10; i++) {
  const button = document.createElement("button");
  button.classList.add("numButton");
  button.innerHTML = i;
  button.addEventListener("click", (e) => {
    const displayNumber = calcDisplay();
    displayNumber.clickNumbers(e.target.innerHTML);
  });
  document.querySelector(".buttons").append(button);
}
// replicating enum with key value pairs, so i can use them later
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
    const display = calcDisplay();
    if (e.target.id == "equals") {
      display.clickEquals();
    } else {
      display.clickOperators(e.target.innerHTML);
    }
  });
  document.querySelector(".buttons").append(button);
});
