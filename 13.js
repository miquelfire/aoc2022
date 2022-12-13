/**
 * 
 * @param {(number|number[])[]} left 
 * @param {(number|number[])[]} right 
 * @returns {number}
 */
function comparePairs(left, right) {
	let index = 0;
	while (index < left.length && index < right.length) {
		if (left[index].constructor === Array && right[index].constructor === Array) {
			const ret = comparePairs(left[index], right[index]);
			if (ret !== 0) {
				return ret;
			}
		}
		else if (left[index].constructor === Array) {
			// Need to double check this
			const ret = comparePairs(left[index], [right[index]]);
			if (ret !== 0) {
				return ret;
			}
		}
		else if (right[index].constructor === Array) {
			// Need to double check this
			const ret = comparePairs([left[index]], right[index]);
			if (ret !== 0) {
				return ret;
			}
		}
		else {
			if (left[index] < right[index]) {
				return -1;
			}
			if (left[index] > right[index]) {
				return 1;
			}
		}
		index++;
	}
	// Fall through for when one is shorter than the other, but same otherwise
	if (index == left.length && index < right.length) {
		return -1;
	}
	if (index < left.length && index == right.length) {
		return 1;
	}
	return 0;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n').map(e => e.split('\n').map(e => JSON.parse(e)));
	const rightOrder = [];

	data.forEach((pair, index) => {
		if (comparePairs(...pair) == -1) {
			rightOrder.push(index + 1);
		}
	});
	return rightOrder.reduce((p, v) => p + v, 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = (d + '\n[[2]]\n[[6]]').split('\n\n')
		.join('\n')
		.split('\n')
		.map(e => JSON.parse(e))
		.sort((a, b) => comparePairs(a, b))
		.map(e => JSON.stringify(e));
	const decoderPacket = [data.indexOf('[[2]]') + 1, data.indexOf('[[6]]') + 1];
	return decoderPacket.reduce((p, v) => p * v, 1);
};
