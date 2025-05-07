const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/NotesModel')
const { validationResult, body } = require('express-validator')

// Get all notes
router.get('/fetechallnotes', fetchuser, async (req, res) => {
    try {
        const getNotes = await Notes.find({ user: req.user.id })
        res.json(getNotes)
    } catch (error) {
        console.log(error)
        res.send(500).send({ error })
    }
})

// Add notes
router.post('/addnotes', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    try {
        const note = new Notes({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })

        const saveNotes = await note.save()
        res.json(saveNotes)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
})

module.exports = router