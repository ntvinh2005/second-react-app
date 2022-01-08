const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Group = require('../models/Group')

// @route GET api/group
// @route Get in group
// @access private
router.get('/loginGroup', verifyToken, async (req, res) => {
    const {code} = req.body
    if (!code) return res.status(400).json({success: false, message: 'Missing group\'s code'})

    try {
        const group = await Group.findOne({code})
        if (!group) return res.status(400).json({success: false, message: 'Incorrect group\'s code'})

        res.status(200).json({success: true, message: 'Logged in the group successfully!', group})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
})

// @route POST api/group
// @access public

router.post('/createGroup', verifyToken, async (req, res) => {
    const groupname=req.body.groupname
    const code=req.body.code

    // Validation
    if (!groupname || !code)
    return res.status(400).json({success: false, message: 'Missing group\'s name or code'})

    try {
        //Check for existing user
        const group = await Group.findOne({ code: code})

        if(group)
        return  res.status(400).json({success: false, message: 'Group code have already been taken'})
        const newGroup = new Group({groupname: groupname, code: code, admin: req.userId})
        await newGroup.save()

        res.status(200).json({success: true, message: "Successfully created the group"})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
})

module.exports = router