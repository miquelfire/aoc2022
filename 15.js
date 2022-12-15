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
	const data = d.split('\n')
		.map(e => [...(/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/.exec(e))].slice(1))
		.map(e => e.map(e => parseInt(e, 10)))
		.map(e => [e[0], e[1], Math.abs(e[0] - e[2]) + Math.abs(e[1] - e[3]) + 1]);
	//const range = 20;
	const range = 4000000;

	for (const sensor of data) {
		// Search parameter
		let x = sensor[0];
		let y = sensor[1] - sensor[2];
		let xDir = 1;
		let yDir = 1;
		let searching = true;
		let turn = 0;
		while (searching) {
			// Check if we need to change the x direction
			x += xDir;
			y += yDir;
			if (y == sensor[1]) {
				xDir *= -1;
				turn++;
			}
			if (x == sensor[0]) {
				yDir *= -1;
				turn++;
			}
			if (turn > 3) {
				break;
			}
			if (x >= 0 && y >= 0 && x <= range && y <= range) {
				// Check to see if this spot overlaps with another sensor
				searching = false;
				for (const checkSensor of data) {
					if (checkSensor == sensor) {
						continue;
					}
					if (Math.abs(x - checkSensor[0]) + Math.abs(y - checkSensor[1]) <= checkSensor[2] - 1) {
						searching = true;
						break;
					}
				}
				if (!searching) {
					return x * 4000000 + y;
				}
				searching = true;
			}


		}
		//break; // Until I do the loops
	}
};
