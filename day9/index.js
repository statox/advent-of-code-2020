const INPUT_PATH = './input';
const fs = require('fs');

let data;
try {
    // read contents of the file
    data = fs.readFileSync(INPUT_PATH, 'UTF-8');
} catch (err) {
    console.error(err);
    process.exit(1);
}
const lines = data.split(/\r?\n/).filter((l) => l.length > 0);

const code = lines.map(Number);
const PREAMBLE_LENGHT = 25;

// Core of the problem: Given one number and its X previous ones
// check if there is on pair which adds to the number
// If the input was bigger maybe there would be a need for a more performant
// algorithm, but it works so...
const isValidNumber = (n, prevs) => {
    for (let i = 0; i < prevs.length; i++) {
        for (let j = 0; j < prevs.length; j++) {
            if (i !== j && prevs[i] + prevs[j] === n) {
                return true;
            }
        }
    }
    return false;
};

/*
 * Part 1
 * My res: 257342611
 */
let part1;
for (let i = PREAMBLE_LENGHT; i < code.length; i++) {
    const curr = code[i];
    const prevs = code.slice(i - PREAMBLE_LENGHT, i);
    if (!isValidNumber(curr, prevs)) {
        console.log('found', curr);
        part1 = curr;
    }
}

console.log(`Part 1 ${part1}`);

/*
 * Part 2
 * My res: 35602097
 */
let found = false;
let i = 0;
let prevs;
while (!found && i < code.length) {
    prevs = [];
    let sum = 0;
    let j = i;
    while (sum < part1) {
        sum += code[j];
        prevs.push(code[j]);
        j++;
    }
    if (sum === part1) {
        found = true;
    }
    i++;
}

const part2 = Math.min(...prevs) + Math.max(...prevs);
console.log(`Part 2 ${part2}`);
