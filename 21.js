/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	const results = new Map();
	const pendingOperations = new Map();

	data.forEach(e => {
		const regex = /^([^:]+): (?:(\d+)|([a-z]+) ([+\-*/]) ([a-z]+))/;
		const match = regex.exec(e);
		if (match[2]) {
			results.set(match[1], parseInt(match[2]));
		}
		else {
			pendingOperations.set(match[1], [match[3], match[4], match[5]]);
		}
	});

	while (pendingOperations.size) {
		for (let [key, value] of pendingOperations) {
			if (results.has(value[0]) && results.has(value[2])) {
				switch (value[1]) {
					case '+': {
						results.set(key, results.get(value[0]) + results.get(value[2]));
						break;
					}
					case '-': {
						results.set(key, results.get(value[0]) - results.get(value[2]));
						break;
					}
					case '*': {
						results.set(key, results.get(value[0]) * results.get(value[2]));
						break;
					}
					case '/': {
						results.set(key, results.get(value[0]) / results.get(value[2]));
						break;
					}
				}
				pendingOperations.delete(key);
			}
		}
	}
	return results.get('root');
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	const results = new Map();
	const pendingOperations = new Map();

	data.forEach(e => {
		const regex = /^([^:]+): (?:(\d+)|([a-z]+) ([+\-*/]) ([a-z]+))/;
		const match = regex.exec(e);
		if (match[2]) {
			results.set(match[1], parseInt(match[2]));
		}
		else {
			if (match[1] == 'root') {
				match[4] = '=';
			}
			pendingOperations.set(match[1], [match[3], match[4], match[5]]);
		}
	});

	results.delete('humn');

	// Do the dumb way until we did all we could
	while (pendingOperations.size) {
		let didSomething = false;
		for (let [key, value] of pendingOperations) {
			if (results.has(value[0]) && results.has(value[2])) {
				didSomething = true;
				switch (value[1]) {
					case '+': {
						results.set(key, results.get(value[0]) + results.get(value[2]));
						break;
					}
					case '-': {
						results.set(key, results.get(value[0]) - results.get(value[2]));
						break;
					}
					case '*': {
						results.set(key, results.get(value[0]) * results.get(value[2]));
						break;
					}
					case '/': {
						results.set(key, results.get(value[0]) / results.get(value[2]));
						break;
					}
				}
				pendingOperations.delete(key);
			}
		}
		if (!didSomething) {
			break;
		}
	}

	// Now to calculate what humn should be
	const getOper = (key) => {
		if (key == 'humn') {
			return false;
		}
		const oper = pendingOperations.get(key);
		// Get any numbers we have already
		if (typeof oper[0] !== 'number') {
			if (results.has(oper[0])) {
				// We have a number for the left operation
				oper[0] = results.get(oper[0]);
			}
			else {
				oper[0] = getOper(oper[0]);
			}
		}

		if (typeof oper[2] !== 'number') {
			if (results.has(oper[2])) {
				oper[2] = results.get(oper[2]);
			}
			else {
				oper[2] = getOper(oper[2]);
			}
		}

		if (typeof oper[0] == 'number' && typeof oper[2] == 'number') {
			// We have both!
			console.log('hello');
		}
		return oper;
	};
	const root = getOper('root');

	// Now to solve for root
	

	return root;
};
