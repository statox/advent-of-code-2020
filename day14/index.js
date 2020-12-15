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

/*
 * Part 1
 * My res: 9967721333886
 */
let mask;
let memory = {};
lines.forEach((l) => {
    if (l.match(/^mask/)) {
        mask = l.split(' = ')[1].split('').reverse().join('');
    } else {
        const addr = Number(l.match(/\d+/)[0]);
        const value = Number(l.match(/\d+$/)[0]);
        const binValue = value.toString(2).split('').reverse().join('');
        let maskedValueArray = [];
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] !== 'X') {
                maskedValueArray.push(mask[i]);
            } else if (i >= binValue.length) {
                maskedValueArray.push('0');
            } else {
                maskedValueArray.push(binValue[i]);
            }
        }
        maskedBinValue = maskedValueArray.reverse().join('');
        maskedValue = parseInt(maskedBinValue, 2);
        memory[addr] = maskedValue;
    }
});

const part1 = Object.keys(memory).reduce((total, addr) => (total += memory[addr]), 0);
console.log(`Part1 ${part1}`);

/*
 * Part 2
 * My res: 4355897790573
 */
mask;
memory = {};
// After writting this code I feel dirty
// I will not comment it, I will not clean it up
// I will just commit it and try to erase it from my memory
// Who reads that anyway? ¯\_(ツ)_/¯
lines.forEach((l) => {
    if (l.match(/^mask/)) {
        mask = l.split(' = ')[1].split('').reverse().join('');
    } else {
        const addr = Number(l.match(/\d+/)[0]);
        const value = Number(l.match(/\d+$/)[0]);
        let binAddr = addr.toString(2).split('').reverse().join('');
        while (binAddr.length !== mask.length) {
            binAddr += '0';
        }
        let maskedAddrArray = [];
        for (let i = 0; i < mask.length; i++) {
            if (['X', '1'].includes(mask[i])) {
                maskedAddrArray.push(mask[i]);
            } else {
                maskedAddrArray.push(binAddr[i]);
            }
        }
        maskedBinAddr = maskedAddrArray.reverse().join('');
        const floatingBits = maskedAddrArray.filter((c) => c === 'X').length;
        const floatingBitsIndex = maskedAddrArray
            .map((c, i) => {
                return {c, i};
            })
            .filter((o) => o.c === 'X')
            .map((o) => o.i);

        const binAddresses = [];
        for (let i = 0; i <= 2 ** floatingBits - 1; i++) {
            const binI = [...i.toString(2).padStart((2 ** floatingBits - 1).toString(2).length, '0')];
            let newAddr = maskedBinAddr.slice();

            for (let j = 0; j < binI.length; j++) {
                newAddr =
                    newAddr.substring(0, floatingBitsIndex[j]) + binI[j] + newAddr.substring(floatingBitsIndex[j] + 1);
            }
            binAddresses.push(newAddr);
        }
        const addresses = binAddresses.map((ba) => parseInt(ba, 2));

        addresses.forEach((a) => (memory[a] = value));
    }
});

const part2 = Object.keys(memory).reduce((total, addr) => (total += memory[addr]), 0);
console.log(`Part2 ${part2}`);
