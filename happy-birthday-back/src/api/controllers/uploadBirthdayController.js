const parseServiceBirthday = require('../services/parseServiceBirthday');
const birthdayModel = require('../models/birthdayModel');
const path = require('path');
const multer = require('multer')
const fs = require('fs')
const {v4: uuidv4} = require('uuid')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'temp/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const originalName = file.originalname;
        const newFilename = `${uniqueSuffix}-${originalName}`;
        cb(null, newFilename);
    }
});

const upload = multer({storage: storage})

exports.uploadCSVBirthday = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: err.message });
        }

        const filePath = path.resolve(__dirname, '../../temp', req.file.filename);
        console.log("filePath", filePath);

        try {
            const parsedData = await parseServiceBirthday.parseFile(filePath);
            console.log('Parsed data:', parsedData);

            // Vérifiez les données avant l'insertion
            parsedData.forEach(row => {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!row.birthday || !dateRegex.test(row.birthday)) {
                    throw new Error(`Invalid birthday format in row: ${JSON.stringify(row)}`);
                }
            });

            await birthdayModel.insertBirthday(parsedData);
            res.status(200).send('Birthdays uploaded and processed successfully.');
        } catch (err) {
            console.error('Error processing file:', err);
            res.status(500).send(`Error processing file: ${err.message}`);
        } finally {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
                else console.log('File deleted', filePath);
            });
        }
    });
};