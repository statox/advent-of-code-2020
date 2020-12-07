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
const lines = data.split(/\r?\n/);

/*
 * Part 1
 * My res: 6443
 */
const groups = [];
let currentGroup = [];
lines.forEach((l) => {
    if (l === '') {
        groups.push(currentGroup);
        currentGroup = [];
    } else {
        currentGroup.push(l);
    }
});

const part1 = groups
    .map((g) => g.join(''))
    .map((g) => new Set([...g]).size)
    .reduce((a, b) => a + b);
console.log({part1});

/*
 * Part 2
 * My res: 3232
 */
const intersection = (group) => {
    const allLetters = new Set();
    group.forEach((i) => [...i].forEach((l) => allLetters.add(l)));
    const filtered = [...allLetters].filter((l) => group.every((i) => i.includes(l)));
    return filtered.length;
};

const part2 = groups.map(intersection).reduce((a, b) => a + b);
console.log({part2});
