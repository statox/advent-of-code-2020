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

const getNewInterval = (dir, [min, max]) => {
    // Lower
    if (['F', 'L'].includes(dir)) {
        const newMax = Math.floor((min + max) / 2);
        return [min, newMax];
    }
    // Upper
    if (['B', 'R'].includes(dir)) {
        const newMin = Math.floor((min + max) / 2) + 1;
        return [newMin, max];
    }

    throw new Error('Invalid direction');
};

const getValueFromCode = (code, initialRange) => {
    let dir;
    let range = initialRange;
    for (let i = 0; i < code.length; i++) {
        dir = code[i];
        range = getNewInterval(dir, range);
    }
    return range[['F', 'L'].includes(dir) ? 0 : 1];
};

const getRow = (code) => getValueFromCode(code, [0, 127]);
const getCol = (code) => getValueFromCode(code, [0, 7]);
const getSeatID = (code) => {
    const rowCode = [...code.slice(0, 7)];
    const colCode = [...code.slice(7, 10)];
    const row = getRow(rowCode);
    const col = getCol(colCode);
    return 8 * row + col;
};

/*
 * Part 1
 * my res: 976
 */
const ids = new Set();
let minId = getSeatID(lines[0]);
let maxId = 0;
lines.forEach((code) => {
    const id = getSeatID(code);
    ids.add(id);

    if (id < minId) {
        minId = id;
    }
    if (id > maxId) {
        maxId = id;
    }
});
console.log(`Part 1: ${maxId}`);

/*
 * Part 2
 * my res: 685
 */
for (let i = minId; i < maxId; i++) {
    if (!ids.has(i) && ids.has(i - 1) && ids.has(i + 1)) {
        console.log(`Part 2: ${i}`);
    }
}
