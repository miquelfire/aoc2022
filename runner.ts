// AOC Runner
// Author: Scoder12

import { performance } from 'perf_hooks';
import * as fs from 'fs/promises';
import * as readline from 'readline';

interface day {
	[funName:string]: (data: string) =>  Promise<string | number>;
}

process.on('unhandledRejection', error => {
	console.error(error);
	process.exit(1);
});

export const formatFilename = (day: number): string => {
	// You can customize this function to your liking

	return day.toString().padStart(2, '0');
};

export const formatRuntime = (ms: number): string => {
	// You can customize this function to your liking

	// microseconds
	if (ms <= 1) {
		return Math.round(ms * 1000) + 'µs';
	}
	// miliseconds
	if (ms < 1000) {
		const wholeMs = Math.floor(ms);
		return wholeMs + 'ms ' + formatRuntime(ms - wholeMs);
	}
	const sec = ms / 1000;
	if (sec < 60) {
		const wholeSec = Math.floor(sec);
		const remMs = ms - wholeSec * 1000;
		return wholeSec + 's ' + formatRuntime(remMs);
	}
	// Minutes (hopefully it doesn't get to this point lol)
	return `${Math.floor(sec / 60)}m ` + formatRuntime((sec % 60) * 1000);
};

const runPart = async (part: number, mod: day, data: string) => {
	const funcname = 'part' + part;
	const func = mod ? mod[funcname] : undefined;

	if (typeof func === 'function') {
		console.log('Running Part', part);

		const start = performance.now();
		const outputP = func(data);
		let output;
		// You might want to comment this out to get a slight performance benefit
		if (outputP instanceof Promise) {
			output = await output;
		}
		const end = performance.now();

		console.log('Output:', output);
		const rtime = end - start;
		console.log('Took:', formatRuntime(rtime));
		return rtime;
	} else {
		console.log(`No ${funcname} function`);
		return 0;
	}
};

const getData = async (day: number) => {
	const fname = formatFilename(day) + '.txt';

	let data: string;
	try {
		const buf = await fs.readFile(fname);
		data = buf.toString('utf-8');
	} catch (e) {
		if (e instanceof Error) {
			if (e && e.message) {
				e.message = `Error while reading ${fname}: ` + e.message;
			}
		}
		throw e;
	}
	return data.trim();
};

export const run = async (day: number, year = 2021) => {
	console.log(`AOC ${year} Day ${day}`);

	const mod = await import('./' + formatFilename(day));
	const data = await getData(day);

	const part1Time = await runPart(1, mod, data);
	const part2Time = await runPart(2, mod, data);
	if (part1Time != 0 && part2Time != 0) {
		console.log(`Total time: ${formatRuntime(part1Time + part2Time)}`);
	}
};

const ask = (question: string) =>
	new Promise(resolve => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		rl.question(question, answer => {
			rl.close();
			resolve(answer);
		});
	});

export const getDay = async (maxDay: number) => {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const question = 'Enter day' + (maxDay ? ` (max ${maxDay})` : '') + ': ';
		const inp = await ask(question);

		const day = Number(inp);
		if (isNaN(day)) {
			console.log('Invalid day');
		} else if (maxDay && day > maxDay) {
			console.log(`Must be at most ${maxDay}`);
		} else {
			return day;
		}
	}
};
