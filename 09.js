/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(' '));
	const headPos = [0,0];
	const tailPos = [0,0];
	const tailPlaces = new Set();

	data.forEach((dir) => {
		let amount = +dir[1];
		while (amount) {
			amount--;
			// Move head
			switch (dir[0]) {
				case 'U': {
					headPos[1]++;
					break;
				}
				case 'D': {
					headPos[1]--;
					break;
				}
				case 'R': {
					headPos[0]++;
					break;
				}
				case 'L': {
					headPos[0]--;
					break;
				}
				default:
					console.log('What is this? ' + dir.join(' '));
			}

			// Move Tail
			const tailXDiff = headPos[0] - tailPos[0];
			const tailYDiff = headPos[1] - tailPos[1];
			if (tailXDiff > 1) {
				if (tailYDiff) {
					tailPos[1] += tailYDiff;
				}
				tailPos[0]++;
			}
			else if (tailXDiff < -1) {
				if (tailYDiff) {
					tailPos[1] += tailYDiff;
				}
				tailPos[0]--;
			}
			else if (tailYDiff > 1) {
				if (tailXDiff) {
					tailPos[0] += tailXDiff;
				}
				tailPos[1]++;
			}
			else if (tailYDiff < -1) {
				if (tailXDiff) {
					tailPos[0] += tailXDiff;
				}
				tailPos[1]--;
			}

			tailPlaces.add(tailPos.join('x'));
		}
	});

	return tailPlaces.size;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(' '));
	const knots = [];
	const tailPlaces = new Set();

	for (let i = 0; i < 10; i++) {
		knots.push([0,0]);
	}
	console.log(knots);
	data.forEach(dir => {
		let amount = +dir[1];
		while (amount) {
			amount--;
			// Move head
			switch (dir[0]) {
				case 'U': {
					knots[0][1]++;
					break;
				}
				case 'D': {
					knots[0][1]--;
					break;
				}
				case 'R': {
					knots[0][0]++;
					break;
				}
				case 'L': {
					knots[0][0]--;
					break;
				}
				default:
					console.log('What is this? ' + dir.join(' '));
			}

			for (let i = 1; i < 10; i++) {
			// Move Tail
				const tailXDiff = knots[i - 1][0] - knots[i][0];
				const tailYDiff = knots[i - 1][1] - knots[i][1];
				if (tailXDiff > 1) {
					if (tailYDiff > 0) {
						knots[i][1]++;
					}
					if (tailYDiff < 0) {
						knots[i][1]--;
					}
					knots[i][0]++;
				}
				else if (tailXDiff < -1) {
					if (tailYDiff > 0) {
						knots[i][1]++;
					}
					if (tailYDiff < 0) {
						knots[i][1]--;
					}
					knots[i][0]--;
				}
				else if (tailYDiff > 1) {
					if (tailXDiff > 0) {
						knots[i][0]++;
					}
					if (tailXDiff < 0) {
						knots[i][0]--;
					}
					knots[i][1]++;
				}
				else if (tailYDiff < -1) {
					if (tailXDiff > 0) {
						knots[i][0]++;
					}
					if (tailXDiff < 0) {
						knots[i][0]--;
					}
					knots[i][1]--;
				}

			}
			tailPlaces.add(knots[9].join('x'));
		}

	});
	return tailPlaces.size;
};
