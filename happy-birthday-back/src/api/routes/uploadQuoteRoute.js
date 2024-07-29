const uploadQuoteController = require('../controllers/uploadQuoteController');

module.exports = (server) => {
    server.post('/uploadCSVQuotes', uploadQuoteController.uploadCSVQuotes);
};