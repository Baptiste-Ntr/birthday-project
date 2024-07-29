const db = require('../config/db');

exports.insertBirthday = (data, callback) => {
    const query = 'INSERT INTO students (first_name, last_name, date_of_birth, email) VALUES ?';
    const values = data.map(row => {
        // Convert date format from DD/MM/YYYY to YYYY-MM-DD
        const [day, month, year] = row.birthday.split('/');
        const formattedDate = `${year}-${month}-${day}`;
        return [row.firstname, row.lastname, formattedDate, row.email];
    });
    db.query(query, [values], callback);
};