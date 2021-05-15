const { MarkovMachine } = require('./markov.js');
const fs = require('fs');

beforeAll(function () {
    eggsText = null;
    try {
        eggsText = fs.readFileSync('eggs.txt', 'utf-8');
    }
    catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
});


describe('makeText', function () {
    test('makeText should throw error if numWords argument < 3', () => {
        // since i'm using bigrams 

        const machine = new MarkovMachine(eggsText);
        expect(function () {
            machine.makeText(2);
        })
            .toThrowError();
    });
});

describe('constructor', function () {
    test('constructor should throw error if given a null string', function () {
        expect(function () {
            const machine = new MarkovMachine('');
        })
            .toThrowError();
    });

    test('constructor should throw error if given text less than three words', function () {
        expect(function () {
            const machine = new MarkovMachine('dog cat');
        })
            .toThrowError();
    });
});

describe('makeChainsBigrams', function () {
    test('makeChainsBigrams should produce a map whose set of keys all being two seperate words', function () {
        const machine = new MarkovMachine(eggsText);
        for (let key of machine.chainsBigrams.keys()) {
            let wordLength = key.split(' ').length;
            console.log(wordLength);
            expect(wordLength).toEqual(2);
        }
    });
});