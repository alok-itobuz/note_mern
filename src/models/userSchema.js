import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v)
            },
            message: ({ value: email }) => `${email} is not a valid email.`
        },
        required: [true, 'Email is required.'],
        unique: [true, 'Email must be unique.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    tokens: [{
        type: String,
        required: true
    }]
})

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, JWT_SECRET)

    this.tokens.push(token)
}

const User = mongoose.model('User', userSchema)

export default User