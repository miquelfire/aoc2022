/**
 * @param {string} d 
 */
export const part1 = async d => {
	const tileset = new Set();
	const minMaxXY = [500,300,500,0];
	const sandStart = [500,0];
	const sandRest = new Set(); // Is part of tileset, but only used to track where sand is
	let sandFellIntoVoid = false;
	const data = d.split('\n')
		.map(
			e => e.split(' -> ')
				.map(e => e.split(',').map(e => parseInt(e, 10)))
				
		);

	// Fill in the walls
	data.forEach(e => {
		for (let i = 1; i < e.length; i++) {
			if (e[i - 1][0] == e[i][0]) {
				// The Y is different
				const x = e[i][0];
				const oldY = Math.min(e[i - 1][1], e[i][1]);
				const newY = Math.max(e[i - 1][1], e[i][1]);

				minMaxXY[0] = Math.min(x, minMaxXY[0]);
				minMaxXY[2] = Math.max(x, minMaxXY[2]);

				for (let y = oldY; y <= newY; y++) {
					tileset.add(x + '-' + y);
					minMaxXY[1] = Math.min(y, minMaxXY[1]);
					minMaxXY[3] = Math.max(y, minMaxXY[3]);
				}
			}
			else {
				// The X is different
				const y = e[i][1];
				const oldX = Math.min(e[i - 1][0], e[i][0]);
				const newX = Math.max(e[i - 1][0], e[i][0]);

				minMaxXY[1] = Math.min(y, minMaxXY[1]);
				minMaxXY[3] = Math.max(y, minMaxXY[3]);

				for (let x = oldX; x <= newX; x++) {
					tileset.add(x + '-' + y);
					minMaxXY[0] = Math.min(x, minMaxXY[0]);
					minMaxXY[2] = Math.max(x, minMaxXY[2]);
				}
			}
		}
	});

	// Simulate the sand
	while (!sandFellIntoVoid) {
		const currentPos = [...sandStart];
		let sandFalling = true;
		while (sandFalling) {
			// Void check
			if (currentPos[1] > minMaxXY[3]) {
				sandFalling = false;
				sandFellIntoVoid = true;
				break;
			}

			// Check below
			if (!tileset.has(currentPos[0] + '-' + (currentPos[1] + 1))) {
				currentPos[1]++;
				continue;
			}
			if (!tileset.has((currentPos[0] - 1) + '-' + (currentPos[1] + 1))) {
				currentPos[0]--;
				currentPos[1]++;
				continue;
			}
			if (!tileset.has((currentPos[0] + 1) + '-' + (currentPos[1] + 1))) {
				currentPos[0]++;
				currentPos[1]++;
				continue;
			}
			tileset.add(currentPos.join('-'));
			sandRest.add(currentPos.join('-'));
			sandFalling = false;
		}
	}
	return sandRest.size;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const tileset = new Set();
	const minMaxXY = [500,300,500,0];
	const sandStart = [500,0];
	const sandRest = new Set(); // Is part of tileset, but only used to track where sand is
	let sandFellIntoVoid = false;
	const data = d.split('\n')
		.map(
			e => e.split(' -> ')
				.map(e => e.split(',').map(e => parseInt(e, 10)))
				
		);

	// Fill in the walls
	data.forEach(e => {
		for (let i = 1; i < e.length; i++) {
			if (e[i - 1][0] == e[i][0]) {
				// The Y is different
				const x = e[i][0];
				const oldY = Math.min(e[i - 1][1], e[i][1]);
				const newY = Math.max(e[i - 1][1], e[i][1]);

				minMaxXY[0] = Math.min(x, minMaxXY[0]);
				minMaxXY[2] = Math.max(x, minMaxXY[2]);

				for (let y = oldY; y <= newY; y++) {
					tileset.add(x + '-' + y);
					minMaxXY[1] = Math.min(y, minMaxXY[1]);
					minMaxXY[3] = Math.max(y, minMaxXY[3]);
				}
			}
			else {
				// The X is different
				const y = e[i][1];
				const oldX = Math.min(e[i - 1][0], e[i][0]);
				const newX = Math.max(e[i - 1][0], e[i][0]);

				minMaxXY[1] = Math.min(y, minMaxXY[1]);
				minMaxXY[3] = Math.max(y, minMaxXY[3]);

				for (let x = oldX; x <= newX; x++) {
					tileset.add(x + '-' + y);
					minMaxXY[0] = Math.min(x, minMaxXY[0]);
					minMaxXY[2] = Math.max(x, minMaxXY[2]);
				}
			}
		}
	});

	// Simulate the sand
	while (!sandFellIntoVoid) {
		const currentPos = [...sandStart];
		let sandFalling = true;
		while (sandFalling) {
			// Void check
			if (currentPos[1] + 1 > minMaxXY[3] + 1) {
				tileset.add(currentPos.join('-'));
				sandRest.add(currentPos.join('-'));
				sandFalling = false;
				break;
			}

			// Check below
			if (!tileset.has(currentPos[0] + '-' + (currentPos[1] + 1))) {
				currentPos[1]++;
				continue;
			}
			if (!tileset.has((currentPos[0] - 1) + '-' + (currentPos[1] + 1))) {
				currentPos[0]--;
				currentPos[1]++;
				continue;
			}
			if (!tileset.has((currentPos[0] + 1) + '-' + (currentPos[1] + 1))) {
				currentPos[0]++;
				currentPos[1]++;
				continue;
			}
			if (currentPos[1] == 0) {
				sandFellIntoVoid = true;
			}
			tileset.add(currentPos.join('-'));
			sandRest.add(currentPos.join('-'));
			sandFalling = false;
		}
	}
	return sandRest.size;
};
