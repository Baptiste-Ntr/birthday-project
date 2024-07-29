const quoteService = require('../services/quoteService');
const parseServiceQuote = require('../services/parseServiceQuote');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const quoteModel = require('../models/quoteModel');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'temp/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const orginalName = file.originalname
        const newFilename = `${uniqueSuffix}-${orginalName}`
        cb(null, newFilename)
    }
})

const upload = multer({storage: storage})

exports.uploadCSVQuotes = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if(err) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: err.message });
        }

        const filePath = path.resolve(__dirname, '../../temp', req.file.filename)

        try {
            const parsedData = await parseServiceQuote.parseFile(filePath)

            await quoteModel.insertQuote(parsedData)
            res.status(200).send('Quotes uploaded and processed successfully.')
        } catch(err) {
            console.error('Error processing file:', err);
            res.status(500).send(`Error processing file: ${err.message}`)
        } finally {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
                else console.log('File, deleted', filePath)
            })
        }
    })
};