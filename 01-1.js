const fs = require('fs');

const numbers = fs.readFileSync('./01.txt', 'utf8').split('\n').map(Number);
const result = numbers.reduce((a, b) => a + b, 0);

console.log(result)
