const db = require('../config/db');

exports.insertBirthday = (data, callback) => {
    const query = 'INSERT INTO students (firstname, lastname, date_of_birth, email) VALUES ?';
    const values = data.map(row => {
        // Assumer que la date est déjà au format YYYY-MM-DD
        const formattedDate = row.birthday;
        return [row.firstname, row.lastname, formattedDate, row.email];
    });
    db.query(query, [values], callback);
};