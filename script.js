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
      case "add":
        add(num);
        break;
      case "subtract":
        subtract(num);
        break;
      case "multiply":
        multiply(num);
        break;
      case "divide":
        divide(num);
        break;
      case "modulo":
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

const calc = calculator();
document.querySelector(".lowerScreen").innerHTML = calc.getResult();

for (let i = 0; i < 10; i++) {
  const button = document.createElement("button");
  button.classList.add("numButton");
  button.innerHTML = i;
  button.addEventListener("click", (e) => {
    return console.log(e.target.innerHTML);
  });
  document.querySelector(".buttons").append(button);
}
//bio sam lijen pa oponasam enum da uz operacije dodam i neki id koji cu iskoristit posle
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
    if (e.target.id == "equals") {
      // izracunaj i stavi u donji dio ekrana veliki rezultat
      console.log("jes " + e.target.id);
    } else {
      // izracunaj i stavi u gornji dio ekrana sa operacijom
      console.log("nope " + e.target.id);
    }
  });
  document.querySelector(".buttons").append(button);
});
