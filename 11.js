/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	const itemsRegex = /^ {2}Starting items: (.*)$/;
	const operationRegex = /^ {2}Operation: new = old (.*) (.*)$/;
	const testRegex = /^ {2}Test: divisible by (.*)$/;
	const trueFalseRegex = /^ {4}If (true|false): throw to monkey (.*)$/;
	const monkeyScore = [];
	const monkeyItems = [];
	const monkeyIntrust = [];

	// Read the data
	while (data.length) {
		const state = data.splice(0, 7);
		const instruct = {
			oper: '',
			amount: 0,
			test: 1,
			pass: 0,
			fail: 0,
		};

		monkeyScore.push(0);
		monkeyItems.push((itemsRegex.exec(state[1]))[1].split(', ').map(e => parseInt(e, 10)));
		
		const oper = operationRegex.exec(state[2]);
		instruct.oper = oper[1];
		instruct.amount = parseInt(oper[2], 10);
		
		instruct.test = parseInt((testRegex.exec(state[3]))[1], 10);

		instruct.pass = parseInt((trueFalseRegex.exec(state[4]))[2], 10);
		instruct.fail = parseInt((trueFalseRegex.exec(state[5]))[2], 10);

		monkeyIntrust.push(instruct);
	}

	// Round the rounds
	for (let round = 0; round < 20; round++) {
		monkeyScore.forEach((_, monkey) => {
			while (monkeyItems[monkey].length) {
				monkeyScore[monkey]++;
				let item = monkeyItems[monkey].shift();
				let amount = monkeyIntrust[monkey].amount;
				if (isNaN(amount)) {
					amount = item;
				}
				switch (monkeyIntrust[monkey].oper) {
					case '+': {
						item += amount;
						break;
					}
					case '*': {
						item *= amount;
						break;
					}
					default:
						throw new Error('Unknown operation: ' + monkeyIntrust[monkey].oper);
				}
				item = Math.floor(item/3);

				if ((item % monkeyIntrust[monkey].test) == 0) {
					monkeyItems[monkeyIntrust[monkey].pass].push(item);
				}
				else {
					monkeyItems[monkeyIntrust[monkey].fail].push(item);
				}
			}
		});
	}

	monkeyScore.sort((a, b) => b - a);
	return monkeyScore[0] * monkeyScore[1];
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	const itemsRegex = /^ {2}Starting items: (.*)$/;
	const operationRegex = /^ {2}Operation: new = old (.*) (.*)$/;
	const testRegex = /^ {2}Test: divisible by (.*)$/;
	const trueFalseRegex = /^ {4}If (true|false): throw to monkey (.*)$/;
	const monkeyScore = [];
	const monkeyItems = [];
	const monkeyIntrust = [];
	let divisor = 1n;

	// Read the data
	while (data.length) {
		const state = data.splice(0, 7);
		const instruct = {
			oper: '',
			amount: 0,
			test: 1,
			pass: 0,
			fail: 0,
		};

		monkeyScore.push(0);
		monkeyItems.push((itemsRegex.exec(state[1]))[1].split(', ').map(e => BigInt(e)));
		
		const oper = operationRegex.exec(state[2]);
		instruct.oper = oper[1];
		try {
			instruct.amount = BigInt(oper[2]);
		}
		catch {
			instruct.amount = false;
		}
		
		instruct.test = BigInt((testRegex.exec(state[3]))[1]);

		instruct.pass = BigInt((trueFalseRegex.exec(state[4]))[2]);
		instruct.fail = BigInt((trueFalseRegex.exec(state[5]))[2]);

		monkeyIntrust.push(instruct);
	}

	// Get Divsor
	monkeyIntrust.forEach((monkey) => {
		divisor *= monkey.test;
	});

	// Round the rounds
	for (let round = 0; round < 10000; round++) {
		monkeyScore.forEach((_, monkey) => {
			while (monkeyItems[monkey].length) {
				monkeyScore[monkey]++;
				let item = monkeyItems[monkey].shift();
				let amount = monkeyIntrust[monkey].amount;
				if (amount === false) {
					amount = item;
				}
				switch (monkeyIntrust[monkey].oper) {
					case '+': {
						item += amount;
						break;
					}
					case '*': {
						item *= amount;
						break;
					}
					default:
						throw new Error('Unknown operation: ' + monkeyIntrust[monkey].oper);
				}
				item = item % divisor;

				if ((item % monkeyIntrust[monkey].test) == 0) {
					monkeyItems[monkeyIntrust[monkey].pass].push(item);
				}
				else {
					monkeyItems[monkeyIntrust[monkey].fail].push(item);
				}
			}
		});
	}

	monkeyScore.sort((a, b) => b - a);
	return monkeyScore[0] * monkeyScore[1];
};
