const birthdayService = require('../services/birthdayService');
const path = require('path');

exports.uploadCSVBirthday = async (req, res) => {
    const filePath = path.join(__dirname, '../../data/students.csv');
    try {
        await birthdayService.processCSVBirthday(filePath);
        res.status(200).send('Birthdays uploaded and processed successfully.');
    } catch (error) {
        res.status(500).send(`Error processing file: ${error.message}`);
    }
};