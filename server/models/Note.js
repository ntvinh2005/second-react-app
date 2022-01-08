const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    deadline: {
        type: Date
    },
    done: { 
        type: Boolean
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('notes', NoteSchema)