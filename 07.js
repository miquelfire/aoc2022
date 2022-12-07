/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	const directorySizes = new Map();
	const cwd = [];
	while (data.length) {
		const line = data.shift();
		const cmd = line.match(/^\$ (cd|ls)(?: (.*))?$/);
		const file = line.match(/^(dir|\d+) (.+)$/);
		if (cmd) {
			if (cmd[1] == 'ls') continue;
			if (cmd[2] == '/') {
				cwd.splice(0, cwd.length);
				cwd.push('root');
			} else if (cmd[2] == '..') {
				cwd.pop();
			} else {
				cwd.push(cwd[cwd.length - 1] + '/' + cmd[2]);
			}

		} else if (file) {
			if (file[1] == 'dir') continue;
			const size = parseInt(file[1], 10);
			cwd.forEach((dir) => {
				directorySizes.set(dir, (directorySizes.get(dir) ?? 0) + size);
			});
		} else {
			console.log(line);
		}
	}
	
	return Array.from(directorySizes.values()).filter((v) => v <= 100000).reduce((c, v) => c + v, 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	const directorySizes = new Map();
	const cwd = [];
	while (data.length) {
		const line = data.shift();
		const cmd = line.match(/^\$ (cd|ls)(?: (.*))?$/);
		const file = line.match(/^(dir|\d+) (.+)$/);
		if (cmd) {
			if (cmd[1] == 'ls') continue;
			if (cmd[2] == '/') {
				cwd.splice(0, cwd.length);
				cwd.push('root');
			} else if (cmd[2] == '..') {
				cwd.pop();
			} else {
				cwd.push(cwd[cwd.length - 1] + '/' + cmd[2]);
			}

		} else if (file) {
			if (file[1] == 'dir') continue;
			const size = parseInt(file[1], 10);
			cwd.forEach((dir) => {
				directorySizes.set(dir, (directorySizes.get(dir) ?? 0) + size);
			});
		} else {
			console.log(line);
		}
	}

	const freeSpace = 70000000 - directorySizes.get('root');
	const files = Array.from(directorySizes.entries()).filter((v) => v[1] > 30000000 - freeSpace).sort((a, b) => b[1] - a[1]);

	return (files.pop())[1];
};
