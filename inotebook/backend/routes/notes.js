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

// update notes
router.put('/update/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    try {
        const newNotes = {}
        if (title) { newNotes.title = title }
        if (description) { newNotes.description = description }
        if (tag) { newNotes.tag = tag }

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send('Not Found')
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed')
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json(note)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }

})

// Delete note
router.delete('/delete/:id',fetchuser, async (req,res)=>{
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send('Not Found')
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not Allowed')
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({
            success:true,
            message:"Note Deleted",
            noteID:req.params.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
})

module.exports = router