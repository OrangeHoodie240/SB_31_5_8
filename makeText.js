/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov.js');
const axios = require('axios');
const fs = require('fs');

async function main() {
    let contents = null;

    if (process.argv[2] === 'url') {
            contents = await axios.get(process.argv[3])
                .then(resp => resp.data)
                .catch(err => {
                    console.error('Error: ', err);
                    process.exit(1);
                });
            
    }
    else if (process.argv[2] === 'file') {
        try {
            contents = fs.readFileSync(process.argv[3],'utf-8');
        }
        catch (err) {
            console.error('Error: ', err);
            process.exit(1);
        }
    }
    else {
        console.error("Invalid argument");
        process.exit(1);
    }

    const machine = new MarkovMachine(contents);
    console.log(machine.makeText());
}

main(); 