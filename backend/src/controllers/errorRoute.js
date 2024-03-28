import { ReasonPhrases, StatusCodes } from "http-status-codes"

export const noRoute = (req, res) => {
    res.status(StatusCodes.BAD_GATEWAY).json({
        status: ReasonPhrases.BAD_GATEWAY,
        message: 'Invalid path',
        data: null
    })
}