/**
 * 
 * @param {(number|number[])[]} left 
 * @param {(number|number[])[]} right 
 * @returns {boolean}
 */
function comparePairs(left, right) {
	let index = 0;
	while (index < left.length && index < right.length) {
		if (left[index].constructor === Array && right[index].constructor === Array) {
			const ret = comparePairs(left[index], right[index]);
			if (ret !== null) {
				return ret;
			}
		}
		else if (left[index].constructor === Array) {
			// Need to double check this
			const ret = comparePairs(left[index], [right[index]]);
			if (ret !== null) {
				return ret;
			}
		}
		else if (right[index].constructor === Array) {
			// Need to double check this
			const ret = comparePairs([left[index]], right[index]);
			if (ret !== null) {
				return ret;
			}
		}
		else {
			if (left[index] < right[index]) {
				return true;
			}
			if (left[index] > right[index]) {
				return false;
			}
		}
		index++;
	}
	// Fall through for when one is shorter than the other, but same otherwise
	if (index == left.length && index < right.length) {
		return true;
	}
	if (index < left.length && index == right.length) {
		return false;
	}
	return null;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n').map(e => e.split('\n').map(e => JSON.parse(e)));
	const rightOrder = [];

	data.forEach((pair, index) => {
		if (comparePairs(...pair)) {
			rightOrder.push(index + 1);
		}
	});
	return rightOrder.reduce((p, v) => p + v, 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
