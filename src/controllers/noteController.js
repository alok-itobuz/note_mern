import { ReasonPhrases, StatusCodes } from "http-status-codes"
import Note from "../models/noteSchema.js";
import mongoose from "mongoose";

export const getNotes = async (req, res) => {
    try {
        const id = req.params.id

        const userIdQuery = { userId: req.user._id }

        const findQuery = id ? { _id: id, ...userIdQuery } : { ...userIdQuery }

        const notes = await Note.find(findQuery, { userId: 0, __v: 0 })


        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'success',
            data: {
                results: notes.length,
                notes,
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
export const createNote = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newNote = new Note({ title, description, userId: req.user._id })

        await newNote.save()

        res.status(StatusCodes.CREATED).json({
            status: ReasonPhrases.CREATED,
            message: 'success',
            data: newNote
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}
export const updateNote = async (req, res) => {
    try {
        const id = req.params.id

        const { title, description } = req.body;

        const updatedNote = await Note.findOneAndUpdate({ _id: id }, { title, description }, { new: true })

        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'success',
            data: updatedNote
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}
export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id

        const deletedNote = await Note.findOneAndDelete({ _id: id })

        res.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            message: 'success',
            data: deletedNote
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}