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
const getGridHash = (g) => g.map((l) => l.join('')).join('');
const getOccupiedSeats = (g) => g.map((l) => l.filter((c) => c === '#').join('')).join('').length;

const grid = lines.map((l) => l.split(''));
// showGrid(grid);

const outOfBound = (g, x, y) => {
    const W = g[0].length;
    const H = g.length;
    return x < 0 || y < 0 || x >= W || y >= H;
};

const countVisibleOccupiedNeighbors = (g, x, y) => {
    const directions = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1]
    ];
    let count = 0;
    for (dir of directions) {
        const [xdiff, ydiff] = dir;
        let _x = x + xdiff;
        let _y = y + ydiff;
        while (!outOfBound(g, _x, _y) && g[_y][_x] === '.') {
            _x += xdiff;
            _y += ydiff;
        }
        if (!outOfBound(g, _x, _y) && g[_y][_x] === '#') {
            count++;
        }
    }
    return count;
};

const applyRules = (g) => {
    const newGrid = [];
    for (let y = 0; y < g.length; y++) {
        newGrid.push([]);
        for (let x = 0; x < g[0].length; x++) {
            const current = g[y][x];
            const visibleOccupiedNeighbord = countVisibleOccupiedNeighbors(g, x, y);
            if (current === 'L' && visibleOccupiedNeighbord === 0) {
                newGrid[y].push('#');
            } else if (current === '#' && visibleOccupiedNeighbord >= 5) {
                newGrid[y].push('L');
            } else {
                newGrid[y].push(current);
            }
        }
    }
    return newGrid;
};

/*
 * Part 2
 * My res: 2064
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

const part2 = getOccupiedSeats(newGrid);
console.log(`Part 2 ${part2}`);
