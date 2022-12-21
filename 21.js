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
	console.log(results);
	return results.get('root');
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
