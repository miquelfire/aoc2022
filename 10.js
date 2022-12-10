/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(' '));
	let x = 1;
	let cycle = 1;
	const cycleTargets = [20, 60, 100, 140, 180, 220];
	let signalSum = 0;
	
	while (data.length > 0 && cycleTargets.length) {
		const command = data.shift();
		cycle += command.length;
		if (cycle > cycleTargets[0]) {
			signalSum += (cycleTargets.shift() * x);
		}
		if (command.length == 2) {
			x += parseInt(command[1]);
		}
	}

	return signalSum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').join(' ').split(' ');
	let x = 1;
	let cycle = 0;
	const cycleTargets = [40,80,120,160,200,240];
	const output =[''];
	const row = [];
	const onState = [-1, 0, 1];

	cycleTargets.forEach(rowStop => {
		row.length = 0;
		while (cycle < rowStop) {
			const state = (cycle % 40) - x;
			const cmd = data.shift();

			if (onState.includes(state)) {
				row.push('#');
			}
			else {
				row.push('.');
			}

			if (!isNaN(cmd)) {
				x += parseInt(cmd);
			}

			cycle++;
		}

		output.push(row.join(''));
	});

	// Just for reference on how to output
	return output.join('\n');
};
