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
const lines = data.split(/\r?\n/).map(Number);

/*
 * Part 1:
 * My result { a: 788, b: 1232, sum: 2020, res: 970816 }
 */
console.log('Part 1');
let i = 0;
let found = false;
while (i < lines.length && !found) {
    const a = lines[i];
    let j = 0;
    i++;
    while (j < lines.length && !found) {
        const b = lines[j];
        j++;
        if (a + b === 2020) {
            console.log({a, b, sum: a + b, res: a * b});
            found = true;
        }
    }
}

/*
 * Part 2
 * My result { a: 912, b: 105, c: 1003, sum: 2020, res: 96047280 }
 */
console.log('Part 2');
found = false;
while (i < lines.length && !found) {
    const a = lines[i];
    let j = 0;
    i++;
    while (j < lines.length && !found) {
        const b = lines[j];
        let k = 0;
        j++;
        while (k < lines.length && !found) {
            const c = lines[k];
            k++;
            if (a + b + c === 2020 && a * b * c !== 0) {
                console.log({a, b, c, sum: a + b + c, res: a * b * c});
                found = true;
            }
        }
    }
}
