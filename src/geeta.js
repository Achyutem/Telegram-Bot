const fetch = require('node-fetch-commonjs');

const MAX_SHLOKAS = [0, 46, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];

async function geeta() {
    const adhyay = Math.floor(Math.random() * 18) + 1;
    const shlok = Math.floor(Math.random() * MAX_SHLOKAS[adhyay]) + 1;
    const response = await fetch(`https://vedicscriptures.github.io/slok/${adhyay}/${shlok}`);
    
    if (!response.ok) throw new Error('Error fetching Geeta verse.');

    const data = await response.json();
    return `${data.chapter}.${data.verse}:\n${data.slok}\n\nAuthor: ${data.sankar.author}\n\nExplanation:\n${data.sankar.et}`;
}

module.exports = { geeta };
