'use strict';
/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d
		.split('\n')
		.map(e => {
			return [... new Set(e.slice(0, e.length / 2).split('').filter(s => e.slice(e.length / 2, e.length).split('').includes(s)))];
		})
		.flat()
		.map(e => {
			e = e.codePointAt(0);
			if (e > 96) {
				return e - 96;
			} else {
				return e - 38;
			}
		})
		.reduce((p, v) => p + v, 0)
		;
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d
		.split('\n')
		.map(e => {
			return [... new Set(e.split(''))];
		})
		.reduce((result, item, index) => {
			const chunkIndex = Math.floor(index/3);

			if (!result[chunkIndex]) {
				result[chunkIndex] = []
			}

			result[chunkIndex].push(item);

			return result;
		}, [])
		.map(e => {
			let [first, ...remain] = e;
			remain.map(s => {
				first = first.filter(p => s.includes(p));
			});

			return first;
		})
		.flat()
		.map(e => {
			e = e.codePointAt(0);
			if (e > 96) {
				return e - 96;
			} else {
				return e - 38;
			}
		})
		.reduce((p, v) => p + v, 0)
		;
	return data;
};
