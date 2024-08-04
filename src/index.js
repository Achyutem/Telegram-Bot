const tgBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { fetchForecast, fetchWeather } = require('./weather');
const { stoicism } = require('./quotes');
const { geeta } = require('./geeta');

dotenv.config();

const TOKEN = process.env.TOKEN;
const bot = new tgBot(TOKEN, { polling: true });

const keywords = {
    'ram ram': 'Ram Ram',
    'hello': 'Ram Ram'
};

bot.on('message', async (message) => {
    const chatId = message.chat.id;
    const messageText = message.text.toLowerCase();

    // Keyword responses
    for (const [keyword, response] of Object.entries(keywords)) {
        if (messageText.includes(keyword)) {
            await bot.sendMessage(chatId, response);
        }
    }

    // Command handling
    if (messageText.startsWith('/quote')) {
        try {
            const quote = await stoicism();
            await bot.sendMessage(chatId, quote);
        } catch (error) {
            await bot.sendMessage(chatId, error.message);
        }
    }

    if (messageText.startsWith('/geeta')) {
        try {
            const geetaVerse = await geeta();
            await bot.sendMessage(chatId, geetaVerse);
        } catch (error) {
            await bot.sendMessage(chatId, error.message);
        }
    }

    if (messageText.startsWith('/forecast')) {
        const cityName = messageText.substring(9).trim();
        if (!cityName) {
            await bot.sendMessage(chatId, 'Please provide a city name for the forecast command.');
        } else {
            try {
                const forecastMessage = await fetchForecast(cityName);
                console.log(forecastMessage)
                await bot.sendMessage(chatId, forecastMessage);
            } catch (error) {
                await bot.sendMessage(chatId, error.message);
            }
        }
    }

    if (messageText.startsWith('/weather')) {
        const cityName = messageText.substring(8).trim();
        if (!cityName) {
            await bot.sendMessage(chatId, 'Please provide a city name for the weather command.');
        } else {
            try {
                const weatherMessage = await fetchWeather(cityName);
                await bot.sendMessage(chatId, weatherMessage);
            } catch (error) {
                await bot.sendMessage(chatId, error.message);
            }
        }
    }

    if (messageText.startsWith('/calc')) {
        const expression = messageText.substring(6).trim(); // Extract the expression after '/calc '
        
        if (!expression) {
            await bot.sendMessage(chatId, 'Please provide a mathematical expression to calculate.');
        } else {
            const responseMessage = calculate(expression);
            await bot.sendMessage(chatId, responseMessage);
        }
    }
});
