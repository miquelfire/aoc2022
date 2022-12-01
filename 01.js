export const part1 = async (d: string) => {
	const data = d.split('\n\n').map(e => e.split('\n').map(e => parseInt(e, 10)));
	return data;
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	return data;
};
