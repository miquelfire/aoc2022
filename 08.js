import { arrayBuffer } from 'stream/consumers';
import { deepCopy } from './utils.js';

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split('').map(e => parseInt(e, 10)));
	const dataTranspose = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
	/** @type {number[][]} */
	const ret = deepCopy(data);

	// Loop inside the trees
	for (let x = 1; x < data.length - 1; x++) {
		for (let y = 1; y < data[x].length - 1; y++) {
			// Set to invisible
			ret[x][y] = false;
			// Do checks if visible

			// Check row
			if (dataTranspose[y].slice(0, x).filter(e => e >= data[x][y]).length == 0) {
				ret[x][y] = true;
			}
			if (dataTranspose[y].slice(x + 1).filter(e => e >= data[x][y]).length == 0) {
				ret[x][y] = true;
			}

			// Check column
			if (data[x].slice(0, y).filter(e => e >= data[x][y]).length == 0) {
				ret[x][y] = true;
			}
			if (data[x].slice(y + 1).filter(e => e >= data[x][y]).length == 0) {
				ret[x][y] = true;
			}
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
	return ret.flat().filter(e => e).length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
