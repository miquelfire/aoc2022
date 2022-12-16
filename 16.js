import { bfs } from './utils.js';

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const parseLineRegex = /Valve ([^ ]+) has flow rate=(\d+); tunnels? leads? to valves? (.*)/;
	const data = d.split('\n')
		.map(e => parseLineRegex.exec(e).slice(1))
		.map(e => [e[0], parseInt(e[1], 10), e[2].split(', ')])
		.sort((a, b) => b[1] - a[1]);
	const valuesValue = new Map();
	const valuesGrid = new Map();
	const valuesCosts = new Map();
	let currentPos = 'AA';
	let targetPos = false; // We don't have a target to go to yet
	let pressureReleased = 0;
	let pressureReleasing = 0;
	let minutesLeft = 30;

	data.forEach(e => {
		valuesGrid.set(e[0], e[2]);
		if (e[1]) {
			valuesValue.set(e[0], e[1]);
		}
	});

	valuesGrid.forEach((_, start) => {
		const costs = new Map();
		valuesValue.forEach((_, end) => {
			if (start == end) return;
			costs.set(end, bfs(start, end, valuesGrid));
		});
		valuesCosts.set(start, costs);
	});

	while (minutesLeft > 0) {
		minutesLeft--;
		// Find next target
		if (!targetPos) {
			// Find the next value to open
			const maxPressure = [currentPos, 0];
			valuesValue.forEach((value, pos) => {
				const pressureTotal = (minutesLeft - valuesCosts.get(currentPos).get(pos).length) * value;
				if (pressureTotal > 0 && pressureTotal > maxPressure[1]) {
					maxPressure[0] = pos;
					maxPressure[1] = pressureTotal;
				}
				console.log(pos, pressureTotal, value, valuesCosts.get(currentPos).get(pos).length);
			});
			console.log(maxPressure);
			break;
		}
	}
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
