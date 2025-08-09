const buttonContainer = document.querySelector("#buttonContainer");
const onScreen = document.querySelector("#onScreen");
const functionOperators = ["-", "x", "+", "÷"];
// isImmediateResult is for checking if all onScreenContent is from the previous operation
let onScreenContent = {string: "", isImmediateResult: false};
let numOperators = 0;

function add(num1, num2) {
    numOperators--;
    return num1 + num2;
}

function subtract(num1, num2) {
    numOperators--;
    return num1 - num2;
}

function multiply(num1, num2) {
    numOperators--;
    return num1 * num2;
}

function divide(num1, num2) {
    numOperators--;
    return num1 / num2;
}

function operate(operator, num1, num2) {
    /* Performs a math operation given these 3 parameters. Returns null if any are invalid */
    // Note: Check for numbers are done as 0 is a valid number
    if (!operator || (!num1 && num1 !== 0) || (!num2 && num2 !== 0))
        return null;

    let result;
    switch (operator) {
        case "+":
            result = round(add(num1, num2));
            break;
        case "-":
            result = round(subtract(num1, num2));
            break;
        case "x":
            result = round(multiply(num1, num2));
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
    /* Updates Screen & increments numOperators if there is an operator on screen. */
    let lastElement = onScreenContent.string[onScreenContent.string.length - 1];
    let consecutiveOperators = functionOperators.includes(lastElement) && functionOperators.includes(newText);
    let onlyOperator = functionOperators.includes(lastElement) && onScreenContent.string.length === 1;
    let isNumber = !functionOperators.includes(newText);

    if (functionOperators.includes(newText) && !functionOperators.includes(lastElement))
        numOperators++;

    // Prevent user from entering consecutive operators or to replace operator with a number (if there is only an operator)
    if (consecutiveOperators || onlyOperator) 
        onScreen.textContent = onScreen.textContent.replace(lastElement, newText);
    else if (newText === Infinity)
        onScreen.textContent = "Error";
    // For replacing result if needed. (Ex. 5 + 2 = 7, press 3 then 7 gets replaced with 3)
    else if (onScreenContent.isImmediateResult) {
        onScreenContent.isImmediateResult = false;
        if (isNumber) 
            onScreen.textContent = newText;
        else 
            // Append operator immediately
            onScreen.textContent += newText;
    } else 
        onScreen.textContent += newText;
    onScreenContent.string = onScreen.textContent;
}

function clearScreen() {
    onScreen.textContent = "";
    onScreenContent.string = onScreen.textContent;
}

function resolveString() {
    // Check if number is negative
    let num1 = "", num2 = "";
    if (onScreenContent.string[0] === "-") {
        onScreenContent.string = onScreenContent.string.replace("-", "");
        num1 += "-";
    }
    console.log(onScreenContent);
    // regex expression checks for first occurence of a function operator
    let expressionSplit = onScreenContent.string.split(/[\+\-x÷]/);
    num1 += expressionSplit[0];
    num2 = expressionSplit[1];
    // Specifically using expressionSplit[0].length since num1 may or may not have a negative sign
    let operator = onScreenContent.string[expressionSplit[0].length];
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
    let lastElement = onScreenContent.string[onScreenContent.string.length - 1];
    let consecutiveOperators = functionOperators.includes(lastElement) && functionOperators.includes(newText);
    // Second portion allows evaluating expressions by pressing another function operator. (Ex. 5 + 2, then press x evaluates to 7)
    if (newText === "=" || (functionOperators.includes(newText) && numOperators === 1 && consecutiveOperators === false)) {
        let [num1, operator, num2] = resolveString();
        let result = operate(operator, num1, num2);
        if (result != null) {
            clearScreen();
            updateScreen(result);
            onScreenContent.isImmediateResult = true;
        }
        if (functionOperators.includes(newText))
            updateScreen(newText);
    }
    else if (newText === "AC")
        clearScreen();
    else 
        updateScreen(newText);
}

buttonContainer.addEventListener("click", main);