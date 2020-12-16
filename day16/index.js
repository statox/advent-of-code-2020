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
const lines = data.split(/\r?\n/);

const rules = {};
const otherTickets = [];

// Parse rules
while (lines[0] !== '') {
    const l = lines.shift();

    const [name, ruleString] = l.split(':');
    const [r1, r2] = ruleString.split(' or ');

    rules[name] = [r1, r2].map((r) => r.split('-').map(Number));
}

// parse my ticket
lines.shift(); // empty line
lines.shift(); // 'your ticket' line
const myTicket = lines.shift().split(',').map(Number);

// parse other tickets
lines.shift(); // empty line
lines.shift(); // 'nearby ticket' line
while (lines[0] !== '') {
    otherTickets.push(lines.shift().split(',').map(Number));
}

/*
 * Part 1
 * My res: 26009
 */
const allAllowedRanged = Object.values(rules).flat();
const invalidValues = [];
const validTickets = [];

for (ticket of otherTickets) {
    let allValidValues = true;
    for (let value of ticket) {
        if (!allAllowedRanged.find((r) => r[0] <= value && r[1] >= value)) {
            allValidValues = false;
            invalidValues.push(value);
        }
    }
    if (allValidValues) {
        validTickets.push(ticket);
    }
}

const part1 = invalidValues.reduce((a, b) => a + b, 0);
console.log(`Part 1 ${part1}`);

/*
 * Part 2
 * My res: 589685618167
 */

// Helper to check if a value matches all the rules of a rule name
const fieldMatchesRule = (value, ruleName) => {
    const ranges = rules[ruleName];
    for (range of ranges) {
        const [min, max] = range;
        if (min <= value && max >= value) {
            return true;
        }
    }
    return false;
};

const ruleNames = Object.keys(rules);
const nbFields = validTickets[0].length;
const possibleMatches = {};

// At first all the fields as potential matches for all the rules
for (ruleName of ruleNames) {
    possibleMatches[ruleName] = new Set(validTickets[0].map((v, i) => i));
}

// If at least one field of one ticket doesn't match a rule, eliminate the fields from the potential matches
for (let ruleName of ruleNames) {
    for (let i = 0; i < nbFields; i++) {
        const dontMatch = validTickets.filter((t) => !fieldMatchesRule(t[i], ruleName));

        if (dontMatch.length > 0) {
            possibleMatches[ruleName].delete(i);
        }
    }
}

// Take the rule which has only one match
// Remove this match from the other rules
// And continue until all the rules have only one match
let didSimplification = true;
while (didSimplification) {
    didSimplification = false;
    Object.keys(possibleMatches).forEach((ruleName) => {
        if (possibleMatches[ruleName].size === 1) {
            didSimplification = true;
            const col = possibleMatches[ruleName].values().next().value;

            Object.keys(possibleMatches).forEach((otherRuleName) => {
                if (possibleMatches[otherRuleName].size) {
                    possibleMatches[otherRuleName].delete(col);
                }
            });
            possibleMatches[ruleName] = col;
        }
    });
}

// Once all the rules are associated to one field
// take the fields of the rules with "departure" in it
// and multiply their values
const part2 = Object.keys(possibleMatches)
    .filter((k) => k.match(/departure/))
    .map((k) => possibleMatches[k])
    .map((k) => myTicket[k])
    .reduce((a, b) => a * b, 1);

console.log(`Part 2 ${part2}`);
