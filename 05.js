/**
 * @param {string} d 
 */
export const part1 = async d => {
	const crateStack = [];
	const data = d.split('\n\n').map(e=> e.split('\n'));
	const columns = parseInt(data[0].pop().match(/(\d)/g).pop(), 10);
	for(let i = 0; i < columns; i++) {
		crateStack.push([]);
	}
	data[0] = data[0]
		.map(e => [...e.matchAll(/[ []([A-Z ])[\] ] ?/g)].map(e=> e[1]))
		.reverse();
	data[0].forEach(row => {
		row.forEach((crate, column) => {
			if (crate !== ' ') {
				crateStack[column].push(crate);
			}
		});
	});
	
	data[1].forEach(command => {
		const moves = command.match(/move (\d+) from (\d+) to (\d+)/).map(e => parseInt(e, 10));
		for (let i = 0; i < moves[1]; i++) {
			const crate = crateStack[moves[2] - 1].pop();
			crateStack[moves[3] - 1].push(crate);
		}
	});
	return crateStack.reduce((p,v) => p + v.pop(), '');
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const crateStack = [];
	const data = d.split('\n\n').map(e=> e.split('\n'));
	const columns = parseInt(data[0].pop().match(/(\d)/g).pop(), 10);
	for(let i = 0; i < columns; i++) {
		crateStack.push([]);
	}
	data[0] = data[0]
		.map(e => [...e.matchAll(/[ []([A-Z ])[\] ] ?/g)].map(e=> e[1]))
		.reverse();
	data[0].forEach(row => {
		row.forEach((crate, column) => {
			if (crate !== ' ') {
				crateStack[column].push(crate);
			}
		});
	});
	
	data[1].forEach(command => {
		const moves = command.match(/move (\d+) from (\d+) to (\d+)/).map(e => parseInt(e, 10));
		const crates = crateStack[moves[2] - 1].splice(-moves[1]);
		crateStack[moves[3] - 1].push(...crates);
	});
	return crateStack.reduce((p,v) => p + v.pop(), '');
};
