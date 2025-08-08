const buttonContainer = document.querySelector("#buttonContainer");
const onScreen = document.querySelector("#onScreen");
const functionOperators = ["-", "x", "+", "÷"];
let onScreenContent = null, numOperators = null;

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
    onScreen.textContent += newText;
    onScreenContent = onScreen.textContent;
}

function clearScreen() {
    onScreen.textContent = "";
    onScreenContent = onScreen.textContent;
}

function resolveString() {
    /* Linear parse through string */
    let operator = "", num1 = "", num2 = "", i = 0;
    // Iterate until operator
    while (!functionOperators.includes(onScreenContent[i]))
        num1 += onScreenContent[i++];
    num1 = Number(num1);
    operator = onScreenContent[i++];  // Increment to move to next number
    // Iterate through rest
    while (i < onScreenContent.length) {
        num2 += onScreenContent[i];
        i++;
    }
    num2 = Number(num2);
    return [operator, num1, num2];
}

function main(event) {
    let button = event.target;
    // Event validation in case user clicks a column
    if (button.className !== "button") 
        return;

    let newText = button.textContent;
    if (newText === "=" || numOperators === 2) {  // TODO: FINISH IMPLEMENTING numOperators
        let [operator, num1, num2] = resolveString();
        let result = operate(operator, num1, num2);
        clearScreen();
        updateScreen(result);
    } else if (newText === "AC")
        clearScreen();
    else
        updateScreen(newText);
}

buttonContainer.addEventListener("click", main);