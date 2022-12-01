/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n')
		.map(e => e.split('\n')
			.map(e => parseInt(e, 10))
			.reduce((p, c) => p + c, 0)
		);
	return Math.max(...data);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n\n')
		.map(
			e => e.split('\n')
				.map(e => parseInt(e, 10))
				.reduce((p, c) => p + c, 0)
		)
		.sort((a,b)=> b - a)
		.slice(0, 3)
		.reduce((p, v) => p + v, 0);
	return data;
};
