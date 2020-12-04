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
const lines = data.split(/\r?\n/);

/*
 * Part 1
 * My result: 591
 * Part 2
 * My result: 335
 */
let validLinesPart1 = 0;
let validLinesPart2 = 0;

/*
 * For each line extract the string to test and the rule to use to validate
 * the string and use the validation function to count the number of valid entries
 */
lines.forEach((l) => {
    const [rule, pwd] = l.split(': ');
    const {min, max, letter} = parseRule(rule);
    if (pwd && validatePwd1(min, max, letter, pwd)) {
        validLinesPart1++;
    }
    if (pwd && validatePwd2(min, max, letter, pwd)) {
        validLinesPart2++;
    }
});

console.log(`Valid lines part 1 ${validLinesPart1}`);
console.log(`Valid lines part 2 ${validLinesPart2}`);

function parseRule(r) {
    const [limits, letter] = r.split(' ');
    const [min, max] = limits.split('-').map(Number);
    return {min, max, letter};
}

/*
 * Validation function for part 1
 *
 * pwd: The string to test against the rule
 * letter: The letter to test specified by the rule
 * min and max: min and max allowed number of occurences of the letter specified by the rule
 */
function validatePwd1(min, max, letter, pwd) {
    const letterCount = [...pwd].filter((c) => c === letter).length;
    return letterCount >= min && letterCount <= max;
}

/*
 * Validation function for part 2
 *
 * pwd: The string to test against the rule
 * letter: The letter to test specified by the rule
 * index1 and index2: The indexes where the letter is allowed to appear.
 *                    It can appear only in one of these places.
 */
function validatePwd2(index1, index2, letter, pwd) {
    const l1 = pwd[index1 - 1];
    const l2 = pwd[index2 - 1];
    return (l1 === letter || l2 === letter) && l1 !== l2;
}
