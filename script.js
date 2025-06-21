const display = document.getElementById('display');
const historyPanel = document.getElementById('history');
let currentInput = '';
let resultDisplayed = false;
let history = [];

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function updateHistory() {
  historyPanel.innerHTML = history.map(h => `<div>${h}</div>`).join('');
}

function handleInput(value) {
  if (value === 'C') {
    currentInput = '';
  } else if (value === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (value === 'Enter' || value === '=') {
    try {
      const expression = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
      const result = eval(expression);
      history.push(currentInput + ' = ' + result);
      currentInput = result.toString();
      updateHistory();
    } catch {
      currentInput = 'Error';
    }
    resultDisplayed = true;
  } else {
    if (resultDisplayed && /[0-9.]/.test(value)) {
      currentInput = value;
    } else {
      currentInput += value;
    }
    resultDisplayed = false;
  }
  updateDisplay();
}

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    handleInput(button.getAttribute('data-key'));
  });
});

document.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/.=EnterBackspaceEscape';
  if (allowed.includes(e.key) || e.key === 'C') {
    handleInput(e.key === 'Escape' ? 'C' : e.key);
  }
});

document.getElementById('toggleHistory').addEventListener('click', () => {
  historyPanel.classList.toggle('hidden');
});

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});
