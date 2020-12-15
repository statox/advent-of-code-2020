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

// Sort the values and add the last one which is always +3
const adapters = lines.map(Number).sort((a, b) => a - b);
adapters.push(adapters[adapters.length - 1] + 3);
// Will be used in part 2 for faster look up
const adptSet = new Set(adapters);

/*
 * Part 1
 * My res: 2664
 */
const diffs = {};
let prev = 0;
while (adapters.length) {
    const curr = adapters.shift();
    const diff = curr - prev;
    if (diff > 3) {
        console.log('Error no adapter matching', {prev, curr});
    }
    if (!diffs[diff]) {
        diffs[diff] = 0;
    }
    diffs[diff] += 1;
    prev = curr;
}
const part1 = diffs[3] * diffs[1];
console.log(`Part 1 ${part1}`);

/*
 * Part 2
 * My res: 148098383347712
 */
// Poor man's memoize
let cache = {};
const offsets = [1, 2, 3];
const countCombinations = (jolt) => {
    if (cache[jolt]) {
        return cache[jolt];
    }
    let ways = offsets.map((o) => (adptSet.has(jolt + o) ? countCombinations(jolt + o) : 0)).reduce((a, b) => a + b);
    if (ways === 0) {
        ways = 1;
    }
    if (!cache[jolt]) {
        cache[jolt] = ways;
    }
    return ways;
};

const part2 = countCombinations(0);
console.log(`Part 2 ${part2}`);
