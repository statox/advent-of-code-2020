/*
 * The input file was cleaned up with a vim macro to have
 * all the blocks on one line
 * macro: qqV}Jj@q
 */
const INPUT_PATH = './clean_input';
const fs = require('fs');

let data;
try {
    // read contents of the file
    data = fs.readFileSync(INPUT_PATH, 'UTF-8');
} catch (err) {
    console.error(err);
    process.exit(1);
}

// /*
//  * Part 1
//  * Just check that all the mandatory fields are present
//  * My result: 256
//  */
//
// // For all the lines only keep the name of the fields not the values
// const lines = data.split(/\r?\n/).map((l) =>
//     l
//         .split(' ')
//         .filter((c) => c.length)
//         .map((c) => c.split(':')[0])
// );
//
// const isValidEntry = (a) =>
//     a.includes('byr') &&
//     a.includes('iyr') &&
//     a.includes('eyr') &&
//     a.includes('hgt') &&
//     a.includes('hcl') &&
//     a.includes('ecl') &&
//     a.includes('pid');
//
// const res = lines.filter(isValidEntry).length;
// console.log(`Valid entries ${res}`);

/*
 * Part 2
 * My result: 198
 */

// Get all the lines as objects
const lines = data
    .split(/\r?\n/)
    .map((l) => l.split(' ').filter((c) => c.length))
    .map((a) => {
        const r = {};
        a.forEach((i) => {
            const [k, v] = i.split(':');
            r[k] = v;
        });
        return r;
    });

const isValidEntry2 = (e) => {
    // All required fields must be present
    const k = Object.keys(e);
    const allFieldsPresent =
        k.includes('byr') &&
        k.includes('iyr') &&
        k.includes('eyr') &&
        k.includes('hgt') &&
        k.includes('hcl') &&
        k.includes('ecl') &&
        k.includes('pid');
    if (!allFieldsPresent) {
        return false;
    }

    // Birth year between 1920 and 2002
    byr = Number(e['byr']);
    if (Number.isNaN(byr) || byr < 1920 || byr > 2002) {
        return false;
    }

    // Issue year between 2010 and 2020
    iyr = Number(e['iyr']);
    if (Number.isNaN(iyr) || iyr < 2010 || iyr > 2020) {
        return false;
    }

    // Expiration year between 2020 and 2030
    eyr = Number(e['eyr']);
    if (Number.isNaN(eyr) || eyr < 2020 || eyr > 2030) {
        return false;
    }

    // Height. In inch between 59 and 76. In cm between 150 and 193
    hgt = e['hgt'];
    const unit = hgt.match(/cm|in$/);
    const hgtValue = Number(hgt.split(/[a-z]+/)[0]);
    if (!unit || Number.isNaN(hgtValue)) {
        return false;
    }
    if (unit[0] === 'cm' && (hgtValue < 150 || hgtValue > 193)) {
        return false;
    }
    if (unit[0] === 'in' && (hgtValue < 59 || hgtValue > 76)) {
        return false;
    }

    // Hair color must be an hexadecimal value
    hcl = e['hcl'];
    if (!hcl.match(/^#([0-9a-f]){6}$/)) {
        return false;
    }

    // Eye color one of amb blu brn gry grn hzl oth
    ecl = e['ecl'];
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) {
        return false;
    }

    // Passport ID nine-digit number, including leading zeroes
    pid = e['pid'];
    if (!pid.match(/^[0-9]{9}$/)) {
        return false;
    }

    return true;
};

const res = lines.filter(isValidEntry2).length;
console.log(`Valid entries ${res}`);
