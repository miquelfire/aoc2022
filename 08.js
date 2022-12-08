import { deepCopy } from './utils.js';

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split('').map(e => parseInt(e, 10)));
	const ret = deepCopy(data);

	// Loop inside the trees
	for (let x = 1; x < data.length - 1; x++) {
		for (let y = 1; y < data[x].length - 1; y++) {
			// Do checks if visible

			// Check row

			// Check column
			console.log(data[x][y]);
		}
	}

	// Loop the outer wall
	for (let i = 0; i < ret.length; i++) {
		ret[i][0] = true;
		ret[i][ret[i].length - 1] = true;
	}
	for (let i = 0; i < ret[0].length; i++) {
		ret[0][i] = true;
		ret[ret.length - 1][i] = true;
	}
	return ret;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
