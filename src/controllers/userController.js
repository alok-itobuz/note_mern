import { ReasonPhrases, StatusCodes } from "http-status-codes"
import User from "../models/userSchema.js"

export const getUser = async (req, res) => {
    try {
        const findQuery = req.params.id ? { _id: req.params.id } : {}

        const allUsers = await User.find(findQuery)

        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'success',
            data: {
                results: allUsers.length,
                users: allUsers,
            }
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}

export const postUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        const newUser = new User({ name, email, password })

        const result = await newUser.save()

        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'Data saved successfully',
            data: result
        })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.params.id

        const { name, email, password } = req.body

        const data = await User.findOneAndUpdate({ _id: id }, {
            name, email, password
        }, { new: true })

        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'Data updated successfully',
            data
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        const foundUser = await User.findOne({ _id: id })

        if (!foundUser) throw new Error("User doesn't exist")
        const data = await foundUser.deleteOne({ _id: id })
        // const data = await User.findOneAndDelete({ _id: id })

        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'Data deleted successfully',
            data
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}