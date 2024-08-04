const fs = require('fs').promises;

async function stoicism() {
    try {
        const data = await fs.readFile('src/quotes.json', 'utf8');
        const quotes = JSON.parse(data);
        const randInt = Math.floor(Math.random() * quotes.length);
        return `${quotes[randInt].quote} \n- ${quotes[randInt].author}`;
    } catch (err) {
        throw new Error('There was an error fetching the quote.');
    }
}

module.exports = { stoicism };
