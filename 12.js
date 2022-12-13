/**
 * 
 * @param {number[]} startXY 
 * @param {number[]} endXY 
 * @param {number[][]} grid 
 * @returns 
 */
function bfs(startXY, endXY, grid) {
	const startNode = startXY.join('-');
	const endNode = endXY.join('-');
	const queue = [startNode];
	const came_from = new Map();
	came_from.set(startNode, null);

	while (queue.length > 0) {
		const currentNode = queue.shift();
		if (currentNode == endNode) break;
		const [cx, cy] = currentNode.split('-').map(e => parseInt(e, 10));
		let newNode = '';

		// Search side paths
		if (cx - 1 > -1 && (grid[cy][cx - 1] - grid[cy][cx]) < 2) {
			newNode = (cx - 1) + '-' + cy;
			if (!came_from.has(newNode)) {
				queue.push(newNode);
				came_from.set(newNode, currentNode);
			}
		}

		if (cx + 1 < grid[0].length && (grid[cy][cx + 1] - grid[cy][cx]) < 2) {
			newNode = (cx + 1) + '-' + cy;
			if (!came_from.has(newNode)) {
				queue.push(newNode);
				came_from.set(newNode, currentNode);
			}
		}

		if (cy - 1 > -1 && (grid[cy - 1][cx] - grid[cy][cx]) < 2) {
			newNode = cx + '-' + (cy - 1);
			if (!came_from.has(newNode)) {
				queue.push(newNode);
				came_from.set(newNode, currentNode);
			}
		}

		if (cy + 1 < grid.length && (grid[cy + 1][cx] - grid[cy][cx]) < 2) {
			newNode = cx + '-' + (cy + 1);
			if (!came_from.has(newNode)) {
				queue.push(newNode);
				came_from.set(newNode, currentNode);
			}
		}
	}

	let currentNode = endNode;
	const path = [];
	while (currentNode != startNode) {
		path.push(currentNode);
		currentNode = came_from.get(currentNode);
		if (!currentNode) return grid.length * grid[0].length;
	}
	return path.length;

}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	const startXY = [];
	const endXY = [];
	/** @type {number[][]} */
	const grid = [];

	data.forEach((row, y) => {
		const gridRow = [];
		for (let x = 0; x < row.length; x++) {
			if (row[x] == 'S') {
				row[x] = 'a';
				startXY.push(x);
				startXY.push(y);
			}
			if (row[x] == 'E') {
				row[x] = 'z';
				endXY.push(x);
				endXY.push(y);
			}
			const h = row[x].charCodeAt(0) - 97;
			gridRow.push(h);
		}
		grid.push(gridRow);
	});

	return bfs(startXY, endXY, grid);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	const startXY = [];
	const endXY = [];
	/** @type {number[][]} */
	const grid = [];

	data.forEach((row, y) => {
		const gridRow = [];
		for (let x = 0; x < row.length; x++) {
			if (row[x] == 'S') {
				row[x] = 'a';
			}
			if (row[x] == 'a') {
				startXY.push([x, y]);
			}
			if (row[x] == 'E') {
				row[x] = 'z';
				endXY.push(x);
				endXY.push(y);
			}
			const h = row[x].charCodeAt(0) - 97;
			gridRow.push(h);
		}
		grid.push(gridRow);
	});

	let minSteps = grid.length * grid[0].length;
	startXY.forEach(start => {
		minSteps = Math.min(minSteps, bfs(start, endXY, grid));
	});

	return minSteps;
};
