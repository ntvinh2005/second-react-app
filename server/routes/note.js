const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Note = require('../models/Note')

// @route GET api/notes
// @desc Get note
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const notes = await Note.find({user: req.userId}).populate('user')
        res.json({success: true, notes})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
})

// @route POST api/notes
// @desc Creat note
// @access Private

router.post('/', verifyToken,  async(req, res) =>{
    const {title, description, deadline} = req.body
    console.log(!title)
    console.log(String(title))

    //Validation
    if (!title)
        return res.status(400).json({success: false, message: 'Title is required'})

    try {
        const newNote = new Note({
            title, 
            description,
            deadline,
            done: false,
            user: req.userId
        })
        await newNote.save()
        res.json({success: true, message: 'Add note successfully!', note: newNote})

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error', note: newNote})
    }
})

// @route PUT api/route
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, deadline, done } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

    try {
        let updatedNote = {
            title,
            description: description || '',
            deadline,
            done: done
        }

        const postUpdateCondition = {_id: req.params.id, user: req.userId}

        updatedNote = await Note.findOneAndUpdate(postUpdateCondition, updatedNote, {new: true})

        // Not authorizeed to update post

        if (!updatedNote)
        return res.status(401).json({success: false, message: 'Post not found or not authorised'})

        res.json({success: true, message: 'Congratuation!', note: updatedNote})
    } catch (error) {
        return res.status(500).json({success: false, message: 'Internal server error'})
    }
}
)

// @router DELETE api/note
// @desc Delete note
// @access Private
router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deleteNote = await Note.findOneAndDelete(postDeleteCondition)

        // No post or authorize
        if (!deleteNote)
        return res.status(401).json({success: false, message: 'Post or authorization error'})

        res.json({success: true, post: deleteNote})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
})

module.exports = router