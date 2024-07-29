const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

exports.parseFile = (filename) => {
    let results = [];

    return new Promise((resolve, reject) => {
        console.log(`Parsing file ${filename}`);
        fs.createReadStream(filename)
            .pipe(parse({
                delimiter: ";",
                columns: true,
                bom: true,
            }))
            .on("data", function (row) {
                results.push(row)
            })
            .on("end", function () {
                resolve(results)
            })
            .on("error", function (error) {
                reject(error.message);
            });
    })
}