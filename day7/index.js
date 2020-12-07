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

// Build the tree of rules
const RULES = {};
lines
    .map((l) => l.split(' bags contain'))
    .map((l) => [l[0], l[1].split(',')])
    .forEach(([name, rules]) => {
        RULES[name] = {};
        if (!rules[0].match('no other bags')) {
            rules.forEach((r) => {
                const matches = r.match(/(\d+) ([a-z ]+) bag/);
                const qty = Number(matches[1]);
                const color = matches[2];
                RULES[name][color] = qty;
            });
        }
    });

// Check if a tested color can contain a target color
// use a simple cache to avoid repeating the search
const cache = {};
const canCarryColor = (test, target) => {
    // Look for the cache first
    if (cache[test]) {
        return cache[test] === 'true';
    }
    const allowedColor = Object.keys(RULES[test]);

    // Look for the direct rules
    if (allowedColor.includes(target)) {
        cache[test] = 'true';
        return true;
    }

    // Look for the rules recursively
    const children = allowedColor.map((c) => canCarryColor(c, target));
    if (children.find((i) => i)) {
        cache[test] = 'true';
        return true;
    }
    cache[test] = 'false';
    return false;
};

/*
 * Part 1
 * My res: 197
 */
const part1 = Object.keys(RULES).filter((c) => canCarryColor(c, 'shiny gold')).length;
console.log({part1});

/*
 * Part 2
 * My res: 85324
 */

function countBags(color) {
    const children = Object.keys(RULES[color]);
    if (children.length === 0) {
        return 1;
    }

    return 1 + children.map((child) => RULES[color][child] * countBags(child)).reduce((a, b) => a + b);
}

const part2 = countBags('shiny gold') - 1;
console.log({part2});
