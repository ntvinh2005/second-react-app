const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/User')
const verifyToken = require('../middleware/auth')

router.get('/', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({success: false, message: 'User not found'})
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error'})
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const username=req.body.username
    const password=req.body.password

    // Validation
    if (!username || !password)
    return res.status(400).json({success: false, message: 'Missing username and/or password'})

    try {
        //Check for existing user
        const user = await User.findOne({ username: username})

        if(user)
        return  res.status(400).json({success: false, message: 'Username have already been taken'})

        //good confirm, hash password using argon2 (security)
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({username: username, password: hashedPassword})
        await newUser.save()

        //Return token
        const accessToken = jsonwebtoken.sign({userId: newUser._id}, 'jdhjhdjskcnkan838ujcnjdn')

        res.status(200).json({success: true, message: 'Created account successfully!', accessToken})
    } catch(error){
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) =>{
    const {username, password} = req.body

    //Simple validation
    if (!username||!password)
    return res.status(400).json({success: false, message:'Missing username and/or password'})

    try {
        // Check for existing user
        const user = await User.findOne({username})
        if (!user)
        return res.status(400).json({success: false, message: 'Incorrect username'})

        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({success: false, message: 'Incorrect password'})

        // Good confirmed
        // Return Token
        const accessToken = jsonwebtoken.sign({userId: user._id},'jdhjhdjskcnkan838ujcnjdn')
        res.status(200).json({success: true, message: 'Logged in successfully!', accessToken, user})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router