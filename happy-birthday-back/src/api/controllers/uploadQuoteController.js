const quoteService = require('../services/quoteService');
const path = require('path');

exports.uploadCSVQuotes = async (req, res) => {
    const filePath = path.join(__dirname, '../../data/quotes.csv');
    try {
        await quoteService.processCSVQuotes(filePath);
        res.status(200).send('Quotes uploaded and processed successfully.');
    } catch (error) {
        res.status(500).send(`Error processing file: ${error.message}`);
    }
};