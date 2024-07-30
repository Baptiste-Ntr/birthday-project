const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()

exports.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {firstname, lastname,email, password} = req.body

    try {
        const existingUser = await userModel.findUserByEmail(email)
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' })
        }

        await userModel.createUser({firstname, lastname, email, password})
        res.status(201).json({ message: 'User created successfully' })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.findUserByEmail(email)
        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user[0].password)
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({id: user[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.cookie('token', token, {httpOnlu: true, secure: process.env.NODE_ENV === 'production' })
        res.status(200).json({ message: 'User logged in successfully' })
    } catch(err) {
        res.status(500).json({message: 'Server error:' + err.message})
    }
}