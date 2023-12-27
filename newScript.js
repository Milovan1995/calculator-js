///selectors
const upperCalcScreen = document.querySelector(".upperScreen");
const lowerCalcScreen = document.querySelector(".lowerScreen");

/////////////////////
class Calculator {
  constructor() {
    this.num1 = "0";
    this.result = 0;
    this.operation;
  }
  add() {
    this.result += parseInt(this.num1);
  }
  subtract() {
    this.result -= parseInt(this.num1);
  }
  multiply() {
    this.result *= parseInt(this.num1);
  }
  divide() {
    this.result =
      this.num1 == 0
        ? alert("Can't divide by 0")
        : this.result / parseInt(this.num1);
  }
  modulo() {
    this.result =
      this.num1 == 0
        ? alert("Can't calculate modulo with 0")
        : this.result % parseInt(this.num1);
  }
  operate(chosenOperation) {
    switch (chosenOperation) {
      case "+":
        return this.add();
      case "-":
        return this.subtract();
      case "*":
        return this.multiply();
      case "/":
        return this.divide();
      case "%":
        return this.modulo();
      //when the operation hasn't been assigned (at start)
      default:
        this.result = parseInt(this.num1);
        break;
    }
  }
  assignNum1(newNum) {
    this.num1 = this.num1 === "0" ? `${newNum}` : `${this.num1}${newNum}`;
  }
  assignOperation(newOperation) {
    this.operate(this.operation);
    this.operation = newOperation;
    this.num1 = "0";
  }
  getResult() {
    return this.result;
  }
  getOperation() {
    return this.operation;
  }
  getNum() {
    return this.num1;
  }
}
////////////////////////

// Calculator.prototype.add = function () {
//     this.result += parseInt(this.num1);
//   };

//   Calculator.prototype.subtract = function () {
//     this.result -= parseInt(this.num1);
//   };

//   Calculator.prototype.multiply = function () {
//     this.result *= parseInt(this.num1);
//   };

//   Calculator.prototype.divide = function () {
//     this.result =
//       this.num1 == 0
//         ? alert("Can't divide by 0")
//         : this.result / parseInt(this.num1);
//   };

//   Calculator.prototype.modulo = function () {
//     this.result =
//       this.num1 == 0
//         ? alert("Can't calculate modulo with 0")
//         : this.result % parseInt(this.num1);
//   };

//   Calculator.prototype.operate = function (chosenOperation) {
//     switch (chosenOperation) {
//       case "+":
//         return this.add();
//       case "-":
//         return this.subtract();
//       case "*":
//         return this.multiply();
//       case "/":
//         return this.divide();
//       case "%":
//         return this.modulo();
//       // when the operation hasn't been assigned (at start)
//       default:
//         this.result = parseInt(this.num1);
//         break;
//     }
//   };

//   Calculator.prototype.assignNum1 = function (newNum) {
//     this.num1 = this.num1 === "0" ? `${newNum}` : `${this.num1}${newNum}`;
//   };

//   Calculator.prototype.assignOperation = function (newOperation) {
//     this.operate(this.operation);
//     this.operation = newOperation;
//     this.num1 = "0";
//   };

//   Calculator.prototype.getResult = function () {
//     return this.result;
//   };

//   Calculator.prototype.getOperation = function () {
//     return this.operation;
//   };

//   Calculator.prototype.getNum = function () {
//     return this.num1;
//   };
//////////////
const calc = new Calculator();
////////////////////
const initCalculator = () => {
  const buttonMethods = onButtonClicks();
  displayButtons(buttonMethods);
};
///////////////
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
///////////////////////
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

//////////////
initCalculator();
