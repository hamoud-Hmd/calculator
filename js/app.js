const nums = document.querySelectorAll('.num');
const audio = document.querySelector('audio');
const screen = document.querySelector('.calculator-screen h3');
const divideBtn = document.querySelector('div[data-key="NumpadDivide"');
const multiplyBtn = document.querySelector('div[data-key="NumpadMultiply"');
const subtractBtn = document.querySelector('div[data-key="NumpadSubtract"');
const addBtn = document.querySelector('div[data-key="NumpadAdd"');
const clearBtn = document.querySelector('div[data-key="Delete"');
let value = screen.textContent;
let numPassed = false;
const arr = [];
let a, b, op;
console.log(clearBtn);

clearBtn.addEventListener('click', () => {
	value = 0;
	screen.textContent = Number(value);
});

const add = (a, b) => {
	return parseFloat(a) + parseFloat(b);
};

const subtract = (a, b) => {
	return parseFloat(a) - parseFloat(b);
};

const mulitply = (a, b) => {
	return parseFloat(a) * parseFloat(b);
};

const divide = (a, b) => {
	if (b == 0) {
		return -1;
	}

	return parseFloat(a) / parseFloat(b);
};

const operate = (operator, a, b) => {
	let result;
	if (operator == '+') {
		result = add(a, b);
	}
	if (operator == '-') {
		result = subtract(a, b);
	}

	if (operator == '÷') {
		result = divide(a, b);
	}

	if (operator == 'x') {
		result = mulitply(a, b);
	}

	console.log(result);
	screen.textContent = result;
	return result;
};

const outPutNum = num => {
	if (
		num.textContent.replace(/\s/g, '') !== 'C' &&
		num.textContent.replace(/\s/g, '') !== 'AC' &&
		num.textContent.replace(/\s/g, '') !== '+/-' &&
		num.textContent.replace(/\s/g, '') !== '%' &&
		num.textContent.replace(/\s/g, '') !== '-' &&
		num.textContent.replace(/\s/g, '') !== '+' &&
		num.textContent.replace(/\s/g, '') !== 'x' &&
		num.textContent.replace(/\s/g, '') !== '=' &&
		num.textContent.replace(/\s/g, '') !== '÷'
	) {
		value += num.textContent;
	} else {
		return;
	}

	screen.textContent = Number(value);
	let arrLimit = screen.textContent.split('');

	if (value == 0) {
		clearBtn.firstChild.textContent = 'AC';
	}
	let screenFontSize = screen.style.fontSize;
	switch (arrLimit.length) {
		case 8:
			screenFontSize = '3.3rem';
			break;
		case 10:
			screenFontSize = '3rem';
			break;
	}

	screen.style.fontSize = screenFontSize;
};

const playSound = function (e) {
	const num = document.querySelector(`div[data-key="${e.code}"]`);
	if (!num) return;
	if (num == clearBtn) {
		value = 0;
		screen.textContent = Number(value);
		num.firstChild.textContent = 'AC';
	}
	if (value != 0) {
		clearBtn.firstChild.textContent = 'C';
	}

	if (
		(num.textContent.replace(/\s/g, '') == '-' ||
			num.textContent.replace(/\s/g, '') == '+' ||
			num.textContent.replace(/\s/g, '') == 'x' ||
			num.textContent.replace(/\s/g, '') == '÷') &&
		!numPassed
	) {
		console.log(numPassed);
		op = num.textContent.replace(/\s/g, '');
		a = value;
		numPassed = true;
		value = 0;
	}

	if (numPassed) {
		b = parseFloat(value);
	}
	if (num.textContent.replace(/\s/g, '') == '=' && numPassed) {
		operate(op, a, b);
		numPassed = false;
		console.log(op, a, b);
		value = 0;
	}
	outPutNum(num);
	audio.currentTime = 0;
	audio.play();
	num.classList.add('clicked');
};
document.addEventListener('keydown', playSound);

const removeTransition = function (e) {
	if (e.propertyName !== 'transform') return;

	this.classList.remove('clicked');
};
nums.forEach(num => {
	num.addEventListener('transitionend', removeTransition);
});

nums.forEach(num => {
	num.addEventListener('click', () => {
		if (!num) return;
		if (num == clearBtn) {
			value = 0;
			screen.textContent = Number(value);
			num.firstChild.textContent = 'AC';
		}
		if (value != 0) {
			clearBtn.firstChild.textContent = 'C';
		}

		if (
			(num.textContent.replace(/\s/g, '') == '-' ||
				num.textContent.replace(/\s/g, '') == '+' ||
				num.textContent.replace(/\s/g, '') == 'x' ||
				num.textContent.replace(/\s/g, '') == '÷') &&
			!numPassed
		) {
			console.log(numPassed);
			op = num.textContent.replace(/\s/g, '');
			a = value;
			numPassed = true;
			value = 0;
		}

		if (numPassed) {
			b = parseFloat(value);
		}
		if (num.textContent.replace(/\s/g, '') == '=' && numPassed) {
			operate(op, a, b);
			numPassed = false;
			console.log(op, a, b);
			value = 0;
		}
		outPutNum(num);

		audio.currentTime = 0;
		audio.play();
		num.classList.add('clicked');
	});
});
