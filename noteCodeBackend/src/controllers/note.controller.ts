import asyncErrorHandler from "../utils/asyncErrorHandler";
import Note from "../models/note.model";
import CustomError from "../utils/customError";

export const getNote = asyncErrorHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    throw new CustomError("The note you try to get is not found.", 404);
  }
  res.status(200).json({
    status: "success",
    data: { note },
  });
});

export const createNote = asyncErrorHandler(async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json({
    status: "success",
    data: { note },
  });
});

export const updateNote = asyncErrorHandler(async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedNote) {
    throw new CustomError("The note you try to update is not found.", 404);
  }
  res.status(200).json({
    status: "success",
    data: { note: updatedNote },
  });
});
