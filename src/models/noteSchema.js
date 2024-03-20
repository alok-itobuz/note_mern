import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title of note is required.'],
    },
    description: {
        type: String,
        required: [true, 'Description of note is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Note = mongoose.model('Note', noteSchema)

export default Note