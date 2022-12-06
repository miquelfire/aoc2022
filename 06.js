/**
 * @param {string} data 
 */
export const part1 = async data => {
	for (let i = 0; i < data.length - 3; i++) {
		if (/^(?!.*(.).*\1).+$/.test(data.slice(i, i + 4))) {
			return i + 4;
		}
	}
	return -1;
};

/**
 * @param {string} data 
 */
export const part2 = async data => {
	return data;
};
