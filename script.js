const buttonContainer = document.querySelector("#buttonContainer");
const onScreen = document.querySelector("#onScreen");
const functionOperators = ["-", "x", "+", "÷"];
let onScreenContent = "";

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    /* Performs a math operation given these 3 parameters. Returns null if any are invalid */
    if (!operator || !num1 || !num2)
        return null;

    let result;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "÷":
            result = round(divide(num1, num2));
            break;
        default:
            alert("Error: Invalid operator");
    }
    return result;
}

function round(num) {
    /* Rounds number to 2 decimal places */
    return Math.round(num * 100) / 100;
}

function updateScreen(newText) {
    let lastElement = onScreenContent[onScreenContent.length - 1];
    // Used to prevent user from inputting two operators in a row and replacing the operator with a number (if there is only an operator)
    let consecutiveOperators = functionOperators.includes(lastElement) && functionOperators.includes(newText);
    let onlyOperator = functionOperators.includes(lastElement) && onScreenContent.length === 1;
    if (consecutiveOperators || onlyOperator)
        onScreen.textContent = onScreen.textContent.replace(lastElement, newText);
    else
        onScreen.textContent += newText;
    onScreenContent = onScreen.textContent;
}

function clearScreen() {
    onScreen.textContent = "";
    onScreenContent = onScreen.textContent;
}

function resolveString() {
    // regex expression checks for first occurence of a function operator
    let [num1, num2] = onScreenContent.split(/[\+\-x÷]/);
    let operator = onScreenContent[num1.length];
    num1 = Number(num1);
    num2 = Number(num2);
    return [num1, operator, num2];
}

function main(event) {
    let button = event.target;
    // Event validation in case user clicks a column
    if (button.className !== "button") 
        return;

    let newText = button.textContent;
    if (newText === "=") {
        let [num1, operator, num2] = resolveString();
        let result = operate(operator, num1, num2);
        if (result != null) {
            clearScreen();
            updateScreen(result);
        }
    } else if (newText === "AC")
        clearScreen();
    else
        updateScreen(newText);
}

buttonContainer.addEventListener("click", main);