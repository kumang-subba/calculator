const buttons = [
  "CE",
  "C",
  "⌫",
  "÷",
  "7",
  "8",
  "9",
  "X",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "00",
  "0",
  ".",
  "=",
];
const calculator = document.querySelector(".calculator");
const screen = document.querySelector(".screen");
buttons.forEach((element) => {
  let button = document.createElement("button");
  button.addEventListener("click", () => handleClick(element));
  button.innerHTML = element;
  calculator.appendChild(button).className = "button";
});
screen.innerHTML = "0";
var displayedNum = (tempnum = tempoperator = "");
var dotUsed = false;
function handleClick(element) {
  if (dotUsed && element == ".") {
    return;
  }
  if (element == "C") {
    checkDotuse();
    displayedNum = "0";
    tempnum = "";
  } else if (element == "CE") {
    checkDotuse();
    displayedNum = "0";
  } else if (element == "⌫") {
    displayedNum = displayedNum.slice(0, -1);
  } else if (
    element == "X" ||
    element == "÷" ||
    element == "+" ||
    element == "-"
  ) {
    handleOperation(element);
    displayedNum = "";
  } else if (element == "=") {
    Operate();
    if (tempnum != "") {
      displayedNum = tempnum;
      tempnum = "";
    }
  } else {
    if (displayedNum === "0") {
      displayedNum = "";
    }
    if (element == ".") {
      dotUsed = true;
    }
    displayedNum += element;
  }
  screen.innerHTML = displayedNum;
}
function handleOperation(operator) {
  checkDotuse();
  if (tempnum == "") {
    tempnum = displayedNum;
    tempoperator = operator;
    return;
  }
  if (tempoperator != "") {
    Operate();
    tempoperator = operator;
  }
}
function Operate() {
  if (tempoperator == "") {
    return;
  }
  let num1 = Number(tempnum);
  let num2 = Number(displayedNum);
  let result;
  if (tempoperator == "+") {
    result = num1 + num2;
  } else if (tempoperator == "-") {
    result = num1 - num2;
  } else if (tempoperator == "X") {
    result = Math.round(num1 * num2 * 10000) / 10000;
  } else {
    result = Math.round((num1 / num2) * 10000) / 10000;
  }
  tempnum = result.toString();
  tempoperator = "";
}
function checkDotuse() {
  if ((dotUsed = true)) {
    dotUsed = false;
  }
}
document.addEventListener(
  "keydown",
  (event) => {
    event.preventDefault();
    var name = event.key;
    if (name == "*") {
      name = "X";
    } else if (name == "/") {
      name = "÷";
    } else if (name == "Backspace") {
      name = "⌫";
    } else if (name == "Enter") {
      name = "=";
    }
    if (buttons.includes(name)) {
      handleClick(name);
    }
  },
  false
);
