/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n')
		.map(e => e.split(',')
			.map(e => e.split('-').map(e => parseInt(e, 10)))
		);
	data.forEach((v, index) => {
		if (v[0][0] >= v[1][0] && v[0][1] <= v[1][1]) {
			data[index] = true;
		}
		else if (v[1][0] >= v[0][0] && v[1][1] <= v[0][1]) {
			data[index] = true;
		}
	});
	return data.filter(e => e === true).length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n')
		.map(e => e.split(',')
			.map(e => e.split('-').map(e => parseInt(e, 10)))
		);
	data.forEach((v, index) => {
		if (v[0][0] <= v[1][1] && v[1][0] <= v[0][1]) {
			data[index] = true;
		}
	});
	return data.filter(e => e === true).length;
};
