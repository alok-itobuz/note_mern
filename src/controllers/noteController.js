import { ReasonPhrases, StatusCodes } from "http-status-codes"

export const getNotes = async (req, res) => {
    try {

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

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: ReasonPhrases.BAD_REQUEST,
            message: error.message,
            data: null
        })
    }
}