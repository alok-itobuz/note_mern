import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, SALT } from "../config/config.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        trim: true
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
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    tokens: [
        {
            type: String,
            required: true
        }
    ]
})

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, JWT_SECRET)

    this.tokens.push(token)

    return token
}

userSchema.pre('save', function (next) {
    this.password = bcrypt.hash(this.password, +SALT)
    next()
})

const User = mongoose.model('User', userSchema)

export default User