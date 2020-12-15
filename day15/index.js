const INPUT_PATH = './input';
// const INPUT_PATH = './input_test';
const fs = require('fs');

let data;
try {
    // read contents of the file
    data = fs.readFileSync(INPUT_PATH, 'UTF-8');
} catch (err) {
    console.error(err);
    process.exit(1);
}

// split the contents by new line
const n = data.split(',').map(Number);

let memory = {};
let lastSpoken;

/*
 * So I was curious why my implementation was so long (about 4mn on my computer)
 * I reimplemented exactly the same algorithm in python and it runs in about 16 seconds
 */
const newNumber = (lastSpoken, turn) => {
    const lastValue = memory[lastSpoken];
    memory[lastSpoken] = turn;
    return lastValue ? turn - lastValue : 0;
};

// Initialization: Put in memory the numbers from the list
let turn;
for (turn = 1; turn <= n.length; turn++) {
    lastSpoken = newNumber(n[turn - 1], turn);
}
console.log(lastSpoken, memory, turn);

/*
 * Part 1:
 * My res: 1025
 * Part 2
 * My res: 129262
 */
let part1;
let part2;
const N1 = 2020;
const N2 = 30000000;
while (!part1) {
    if (turn === N1) {
        part1 = lastSpoken;
    }
    if (turn === N2) {
        part2 = lastSpoken;
    }

    if (turn % 300000 === 0) {
        console.log(turn);
    }
    lastSpoken = newNumber(lastSpoken, turn);
    console.log(lastSpoken, turn);
    turn++;
}

console.log(`Part 1 ${part1}`);
console.log(`Part 2 ${part2}`);
