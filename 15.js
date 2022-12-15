/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n')
		.map(e => [...(/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/.exec(e))].slice(1))
		.map(e => e.map(e => parseInt(e, 10)));
	const targetY = 2000000;
	const targetYPings = new Set();

	// Set search area of Sensors
	data.forEach(sensor => {
		const dist = Math.abs(sensor[0] - sensor[2]) + Math.abs(sensor[1] - sensor[3]);
		for (let x = sensor[0] - dist; x < sensor[0] + dist; x++) {
			// Outside of the search range
			if (Math.abs(sensor[0] - x) + Math.abs(sensor[1] - targetY) > dist) continue;
			// There's a beacon here
			if (x == sensor[2] && targetY == sensor[3]) continue;

			targetYPings.add(x);
		}
	});
	return targetYPings.size;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
