import { ReasonPhrases, StatusCodes } from "http-status-codes";
import Note from "../models/noteSchema.js";
import APIFeatures from "../utils/APIFeatures.js";

export const getNotes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userIdQuery = { userId: req.user._id };
    const findQuery = id ? { _id: id } : { ...userIdQuery };

    let query = Note.find(findQuery, { userId: 0, __v: 0 });

    const apiFeatures = new APIFeatures(query, req.query);

    const updatedState = apiFeatures.updated().search("title").sort();

    const notes = await updatedState.queryMongoose;

    if (notes.length === 0) throw new Error("You don't have any note.");

    res.status(StatusCodes.OK).send({
      status: ReasonPhrases.OK,
      message: "success",
      data: {
        results: notes.length,
        notes,
      },
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({ title, description, userId: req.user._id });

    await newNote.save();

    res.status(StatusCodes.CREATED).json({
      status: ReasonPhrases.CREATED,
      message: "success",
      data: newNote,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, idArray } = req.body;
    let updatedNote;

    if (idArray) {
      if (!id)
        updatedNote = await Note.updateMany(
          { _id: { $in: idArray } },
          { isHidden: true, updatedAt: Date.now() },
          { multi: true, new: true }
        );
      else throw new Error("Invalid path");
    } else {
      updatedNote = await Note.findOneAndUpdate(
        { _id: id },
        { title, description, updatedAt: Date.now() },
        { new: true }
      );
    }
    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "success",
      data: updatedNote,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    const isDeleteHidden = req.query.isHidden === "true";

    let findQuery = id ? { _id: id } : {};

    findQuery =
      isDeleteHidden && !id ? { ...findQuery, isHidden: true } : findQuery;

    const deletedNote = await Note.deleteMany(findQuery);

    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: "success",
      data: deletedNote,
    });
  } catch (error) {
    next({ status: "BAD_REQUEST", error });
  }
};
