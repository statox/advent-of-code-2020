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

const program = [];
lines.forEach((l) => {
    const [instruction, valueStr] = l.split(' ');
    const value = Number(valueStr);
    program.push([instruction, value]);
});

const executePrg = (prg) => {
    let ptr = 0;
    let acc = 0;
    const visited = new Set();
    while (ptr !== prg.length) {
        const [instr, val] = prg[ptr];
        if (visited.has(ptr)) {
            return {loop: true, acc};
        }
        visited.add(ptr);

        if (instr === 'nop') {
            ptr++;
        }
        if (instr === 'acc') {
            acc += val;
            ptr++;
        }
        if (instr === 'jmp') {
            ptr += val;
        }
    }
    return {loop: false, acc};
};

/*
 * Part 1
 * My res: 1521
 */
const part1 = executePrg(program);
console.log(`Part 1 ${part1.acc}`);

/*
 * Part 2
 * My res: 1016
 */
let found = false;
let i = 0;
let part2;
const inv = {jmp: 'nop', nop: 'jmp'};
const invertInstr = (i) => (program[i][0] = inv[program[i][0]]);
while (!found && i < program.length) {
    if (['nop', 'jmp'].includes(program[i][0])) {
        invertInstr(i);
        const {loop, acc} = executePrg(program);
        invertInstr(i);

        if (!loop) {
            part2 = acc;
            found = true;
        }
    }
    i++;
}

console.log(`Part 2 ${JSON.stringify(part2)}`);
