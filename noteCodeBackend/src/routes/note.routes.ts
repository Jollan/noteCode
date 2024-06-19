import e from "express";
import * as noteController from "../controllers/note.controller";

const noteRouter = e.Router();

noteRouter.route("/").post(noteController.createNote);
noteRouter
  .route("/:id")
  .get(noteController.getNote)
  .patch(noteController.updateNote);

export = noteRouter;
