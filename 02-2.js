const fs = require('fs');

//const testWords = 'abcde,fghij,klmno,pqrst,fguij,axcye,wvxyz'.split(',').map(a => a.split(''));
const words = fs.readFileSync('./02.txt', 'utf8').split('\n').map(a => a.split(''));

let shortest = { distance: words[0].length };
const distances = words.map((word, i) => {
    if (i === words.length - 1) {
        return;
    }

    const distanceToWord = distanceTo(word);
    return words.map(
        w => word !== w ? ({
            distance: distanceToWord(w),
            word: word.filter((l, i) => l === w[i]).join(''),
            match: w.join('')
        }) : ({
            distance: word.length,
            word: w
        })
    ).sort((a, b) => a.distance - b.distance)[0]
})

console.log(shortest, distances.sort((a, b) => a.distance - b.distance)[0])

// Assumes strings have the same length
function distanceTo(a) {
    return b => a.filter((n, i) => n !== b[i]).length
}
