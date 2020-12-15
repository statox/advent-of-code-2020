// Using Victor library because I'm too lazy to do vectors by myself
// EDIT: That that bit my in the butt... hence the part2 with another implem
const Victor = require('victor');

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
const lines = data.split(/\r?\n/).filter((l) => l.length > 0);

const instructions = lines.map((l) => {
    const i = l.slice(0, 1);
    const v = Number(l.slice(1));
    return [i, v];
});

const manhattanDistance = (x, y) => Math.abs(x) + Math.abs(y);

/*
 * Part 1
 * My res: 1565
 */
let ship = {
    dir: new Victor(1, 0), // Facing east
    pos: new Victor(0, 0) // starting point
};

const instructionsPart1 = instructions.slice();
while (instructionsPart1.length) {
    const [i, v] = instructionsPart1.shift();
    if (i === 'F') {
        const diff = ship.dir.clone().multiply(new Victor(v, v));
        ship.pos.add(diff);
    }
    if (i === 'N') {
        const diff = new Victor(0, -v);
        ship.pos.add(diff);
    }
    if (i === 'S') {
        const diff = new Victor(0, v);
        ship.pos.add(diff);
    }
    if (i === 'E') {
        const diff = new Victor(v, 0);
        ship.pos.add(diff);
    }
    if (i === 'W') {
        const diff = new Victor(-v, 0);
        ship.pos.add(diff);
    }
    if (i === 'R') {
        ship.dir.rotateDeg(v);
    }
    if (i === 'L') {
        ship.dir.rotateDeg(-v);
    }
}

const part1 = Math.round(manhattanDistance(ship.pos.x, ship.pos.y));
console.log(`Part 1 ${part1}`);

/*
 * Part 2
 * My res: 78883
 */
ship = {
    pos: new Victor(0, 0), // starting point
    waypoint: new Victor(10, -1)
};

const instructionsPart2 = instructions.slice();
while (instructionsPart2.length) {
    const [i, v] = instructionsPart2.shift();
    if (i === 'F') {
        for (let i = 0; i < v; i++) {
            ship.pos.add(ship.waypoint);
        }
    }
    if (i === 'N') {
        const diff = new Victor(0, -v);
        ship.waypoint.add(diff);
    }
    if (i === 'S') {
        const diff = new Victor(0, v);
        ship.waypoint.add(diff);
    }
    if (i === 'E') {
        const diff = new Victor(v, 0);
        ship.waypoint.add(diff);
    }
    if (i === 'W') {
        const diff = new Victor(-v, 0);
        ship.waypoint.add(diff);
    }
    if (i === 'R') {
        ship.waypoint.rotateDeg(v);
    }
    if (i === 'L') {
        ship.waypoint.rotateDeg(-v);
    }
}

const part2 = Math.round(manhattanDistance(ship.pos.x, ship.pos.y));
console.log(`Part 2 ${part2}`);
