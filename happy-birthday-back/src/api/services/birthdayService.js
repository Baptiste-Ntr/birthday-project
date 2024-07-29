const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const birthdayModel = require('../models/birthdayModel');

exports.processCSVBirthday = (filePath) => {
    return new Promise((resolve, reject) => {
        let results = [];
        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ";", columns: true, bom: true }))
            .on("data", (row) => {
                results.push(row);
            })
            .on("end", () => {
                birthdayModel.insertBirthday(results, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            })
            .on("error", (error) => {
                reject(error.message);
            });
    });
};