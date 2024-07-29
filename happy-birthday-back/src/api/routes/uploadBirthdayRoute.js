const uploadBirthdayController = require('../controllers/uploadBirthdayController');

module.exports = (server) => {
    server.post('/uploadCSVBirthday', uploadBirthdayController.uploadCSVBirthday);
};