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

// split the contents by new line
const grid = data.split(/\r?\n/).map((l) => l.split(''));

/*
 * Part 1
 * My result: 169
 */
let treeCount = 0;
let x = 0;
for (let y = 1; y < grid.length; y++) {
    x = (x + 3) % grid[y].length;
    if (grid[y][x] === '#') {
        treeCount++;
    }
}

console.log(`Trees ${treeCount}`);

/*
 * Part 2
 *
 * Right 1, down 1.
 * Right 3, down 1.
 * Right 5, down 1.
 * Right 7, down 1.
 * Right 1, down 2.
 *
 * My result: 7560370818
 *
 */
const treeCounts = [0, 0, 0, 0, 0];
const xs = [0, 0, 0, 0, 0];
const slopes = [1, 3, 5, 7, 1];
for (let y = 1; y < grid.length; y++) {
    for (let s = 0; s < slopes.length; s++) {
        // Do the calculation at all lines for all of the slopes excepted
        // the last one where we calculate every other lines
        if (s < slopes.length - 1 || y % 2 === 0) {
            xs[s] = (xs[s] + slopes[s]) % grid[y].length;
            if (grid[y][xs[s]] === '#') {
                treeCounts[s] += 1;
            }
        }
    }
}
const result = treeCounts.reduce((a, b) => a * b, 1);
console.log(`Result ${result}`);
