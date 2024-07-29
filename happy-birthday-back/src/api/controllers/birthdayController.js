const { DateTime } = require("luxon");
const parseService = require("../services/parseServiceBirthday");

const db = require('../config/db')

const CSV_STUDENTS = "students.csv";
const CSV_TEACHERS = "intervenants.csv";

exports.getTodaysBirthday = async (req, res) => {
    const todaysDate = DateTime.now().setLocale('fr').toFormat('dd/LL'); //=> '2014 août 06'

    const STUDENTS_BIRTHDAY = await parseService.parseFile(CSV_STUDENTS)
    .then(students => {
        return result = students.filter(student => student.birthday.startsWith(todaysDate));
    });

    const TEACHERS_BIRTHDAY = await parseService.parseFile(CSV_TEACHERS)
    .then(students => {
        return result = students.filter(student => student.birthday.startsWith(todaysDate));
    });

    res.json({
        count_total: STUDENTS_BIRTHDAY.length + TEACHERS_BIRTHDAY.length,
        students_birthday : STUDENTS_BIRTHDAY,
        teachers_birthday : TEACHERS_BIRTHDAY
    })
}

exports.getTodaysBirthdayDB = async (req, res) => {
    const todaysDate = new Date().toISOString().slice(0, 10)
    try {
        // 2024-07-24

        db.query(`SELECT * FROM students WHERE date_of_birth LIKE ?`, [`${todaysDate}%`], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            console.log(results);

            res.json({
                count_total: results.length,
                students_birthday: results
                // students_birthday: results
                // teachers_birthday: teachers
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}