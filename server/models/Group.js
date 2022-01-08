const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    groupname: {
        type: String, 
        required: true,
    },
    code: {
        type: String, 
        required: true,
        unique: true,
    },
    admin: { 
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('groups', GroupSchema)