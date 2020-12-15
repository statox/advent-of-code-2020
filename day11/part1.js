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
const showGrid = (g) => g.forEach((l) => console.log(l.join('')));

const grid = lines.map((l) => l.split(''));
// showGrid(grid);

const getGridHash = (g) => g.map((l) => l.join('')).join('');
const getOccupiedSeats = (g) => g.map((l) => l.filter((c) => c === '#').join('')).join('').length;
const getNeighbors = (g, x, y) => {
    const width = g[0].length;
    const height = g.length;
    const n = [];
    if (y > 0) {
        if (x > 0) {
            n.push(g[y - 1][x - 1]);
        }
        n.push(g[y - 1][x]);
        if (x < width - 1) {
            n.push(g[y - 1][x + 1]);
        }
    }
    if (x > 0) {
        n.push(g[y][x - 1]);
    }
    if (x < width - 1) {
        n.push(g[y][x + 1]);
    }
    if (y < height - 1) {
        if (x > 0) {
            n.push(g[y + 1][x - 1]);
        }
        n.push(g[y + 1][x]);
        if (x < width - 1) {
            n.push(g[y + 1][x + 1]);
        }
    }
    return n;
};

const applyRules = (g) => {
    const newGrid = [];
    for (let y = 0; y < g.length; y++) {
        newGrid.push([]);
        for (let x = 0; x < g[0].length; x++) {
            const current = g[y][x];
            const neighbors = getNeighbors(g, x, y);
            if (current === 'L' && neighbors.filter((c) => c === '#').length === 0) {
                newGrid[y].push('#');
            } else if (current === '#' && neighbors.filter((c) => c === '#').length >= 4) {
                newGrid[y].push('L');
            } else {
                newGrid[y].push(current);
            }
        }
    }
    return newGrid;
};

/*
 * Part 1
 * My res: 2273
 */
let stable = false;
let newGrid = grid;
let prevHash = getGridHash(newGrid);
let i = 0;
while (!stable) {
    i++;
    newGrid = applyRules(newGrid);
    const hash = getGridHash(newGrid);
    if (hash === prevHash) {
        stable = true;
    }
    prevHash = hash;
}

const part1 = getOccupiedSeats(newGrid);
console.log(`Part 1 ${part1}`);
