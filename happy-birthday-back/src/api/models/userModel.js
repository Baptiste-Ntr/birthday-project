const db = require('../config/db')
const bcrypt = require('bcryptjs')

const util = require('util')

const query = util.promisify(db.query).bind(db)

exports.createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const query = 'INSERT INTO users (firstname, lastname, email, password, isadmin) VALUES (?, ?, ?, ?, ?)'
    const values = [userData.firstname, userData.lastname, userData.email, hashedPassword, userData.isadmin]
    return db.query(query, values)
}

exports.findUserByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const results = await query(sql, [email]);
        return results;
    } catch (err) {
        throw new Error('Database query failed: ' + err.message);
    }
};