/**
 * @template T
 * @param {T} e 
 * @returns {T}
 */
export function deepCopy(e) {
	return JSON.parse(JSON.stringify(e));
}
