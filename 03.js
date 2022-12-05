/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d
		.split('\n')
		// Split each pack in half, and find the duplicate item in both halves
		.map(e => {
			return [
				// Trick to make sure we don't have duplicates after processing, as there can be like two P's in each half
				... new Set(
					// Get first half
					e.slice(0, e.length / 2)
						// Make each character it's own array
						.split('')
						// Remove anything that is not in the other half
						.filter(
							// Gets second half
							s => e.slice(e.length / 2, e.length)
								.split('')
								// Is the item we're filtering on in our set?
								.includes(s)
						)
				)
			];
		})
		// Instead of [[P],[q],[T,y]], we want just [P, q, T, y] (I don't think the data set has any packs as [T,y] though)
		.flat()
		// Convert to priority values
		.map(e => {
			e = e.codePointAt(0);
			if (e > 96) {
				return e - 96;
			} else {
				return e - 38;
			}
		})
		// Add it all up
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
		// Remove dups within a pack, so FFhFp becomes Fhp
		.map(e => {
			return [... new Set(e.split(''))];
		})
		// Splits everyone into groups of 3
		.reduce((result, item, index) => {
			const chunkIndex = Math.floor(index/3);

			if (!result[chunkIndex]) {
				result[chunkIndex] = [];
			}

			result[chunkIndex].push(item);

			return result;
		}, [])
		// See what is common between all three packs
		.map(e => {
			let [first, ...remain] = e;
			remain.map(s => {
				first = first.filter(p => s.includes(p));
			});

			return first;
		})
		// Same as part 1
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
