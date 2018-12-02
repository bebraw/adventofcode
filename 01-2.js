const fs = require('fs');

const numbers = fs.readFileSync('./01.txt', 'utf8').split('\n').map(Number);
const seenFrequencies = { 0: true };
let firstOneTwice = null

function * cyclic(numbers) {
    const len = numbers.length;

    for (let i = 0; true; i++) {
        yield numbers[i % len];
    }
}

const cycle = cyclic(numbers);
let currentFrequency = 0

while (true) {
    const currentChange = cycle.next().value
    currentFrequency += currentChange

    if (seenFrequencies[currentFrequency.toString()] && !firstOneTwice) {
        console.log('matched to', currentFrequency)
        break;
    }

    seenFrequencies[currentFrequency] = true;
}
