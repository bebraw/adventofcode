const fs = require('fs');

const numbers = fs.readFileSync('./02.txt', 'utf8').split('\n');

const letterTwoTimes = letterNTimes(2)
const letterThreeTimes = letterNTimes(3)

const letterTwos = numbers.map(letterTwoTimes).filter(Boolean).length
const letterThrees = numbers.map(letterThreeTimes).filter(Boolean).length

console.log(letterTwos, letterThrees, letterTwos * letterThrees)

function letterNTimes(n) {
    return str => Object.values(str.split('').sort().reduce((acc, a) => ({ ...acc, [a]: acc[a] ? acc[a] + 1 : 1}), {})).includes(n)
}