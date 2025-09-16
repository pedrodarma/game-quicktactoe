const _cleanBoard: Record<string, string[]> = {
	a: ['-', '-', '-'],
	b: ['-', '-', '-'],
	c: ['-', '-', '-'],
};

const _winningConditions = [
	['a0', 'a1', 'a2'],
	['b0', 'b1', 'b2'],
	['c0', 'c1', 'c2'],
	['a0', 'b0', 'c0'],
	['a1', 'b1', 'c1'],
	['a2', 'b2', 'c2'],
	['a0', 'b1', 'c2'],
	['a2', 'b1', 'c0'],
];

export const Boards = {
	CLEAN: _cleanBoard,
	WINNING_CONDITIONS: _winningConditions,
};
