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
	const data = d.split('\n');
	return data;
};
