const display = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');

// initial state
let currentNumber = '0';
let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;

// to update the display with the current number
function updateDisplay() {
  display.textContent = currentNumber;
}

function handleNumberClick(number) {
    if (shouldResetDisplay) {
      currentNumber = '';
      shouldResetDisplay = false;
    }

    if (currentNumber.length > 14) {
        currentNumber = currentNumber.slice(0, 14);
      }
  
    currentNumber = currentNumber.replace(/^0+/, '') + number;
    updateDisplay();
  }

// to handle operator clicks
function handleOperatorClick(nextOperator) {
    const inputValue = parseFloat(currentNumber);
  
    if (!operator || isNaN(firstNumber)) {
      firstNumber = inputValue;
    } else {
      handleEqualClick();
      firstNumber = parseFloat(currentNumber);
    }
  
    shouldResetDisplay = true;
    operator = nextOperator;
    updateDisplay();
  }

// to handle decimal clicks
function handleDecimalClick() {
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
    updateDisplay();
  }
}

// to handle clear clicks
function handleClearClick() {
  currentNumber = '0';
  firstNumber = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// to handle calculate clicks
function handleCalculateClick() {
  const inputValue = parseFloat(currentNumber);

  if (operator && !isNaN(firstNumber)) {
    if (operator === 'add') {
      currentNumber = String(firstNumber + inputValue);
    } else if (operator === 'subtract') {
      currentNumber = String(firstNumber - inputValue);
    } else if (operator === 'multiply') {
      currentNumber = String(firstNumber * inputValue);
    } else if (operator === 'divide') {
      currentNumber = String(firstNumber / inputValue);
    }

    firstNumber = null;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
  }
}

// event listeners to the keys
keys.addEventListener('click', event => {
  const target = event.target;

  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('key-operator')) {
    handleOperatorClick(target.dataset.action);
  } else if (target.dataset.action === 'decimal') {
    handleDecimalClick();
  } else if (target.dataset.action === 'clear') {
    handleClearClick();
  } else if (target.dataset.action === 'calculate') {
    handleCalculateClick();
  } else {
    handleNumberClick(target.textContent);
  }
});