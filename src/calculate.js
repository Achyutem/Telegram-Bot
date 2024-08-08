const math = require('mathjs');

function calculate(expression) {
    let result;
    try {
        result = math.evaluate(expression);
    } catch (error) {
        result = 'Invalid calculation';
    }
    return `Equation: ${expression}\nResult: ${result}`;
}

module.exports = { calculate };
