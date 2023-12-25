for (let i = 0; i < 10; i++) {
  const button = document.createElement("button");
  button.classList.add("numButton");
  button.innerHTML = i;
  button.addEventListener("click", (e) => {
    return console.log(e.target.innerHTML);
  });
  document.querySelector(".buttons").append(button);
}

const operators = ["+", "-", "*", "/", "%", "="];
operators.forEach((operator) => {
  const button = document.createElement("button");
  button.classList.add("opButton");
  button.innerHTML = operator;
  button.addEventListener("click", (e) => {
    return console.log(e.target.innerHTML);
  });
  document.querySelector(".buttons").append(button);
});
