import express from "express";
import globalErrorHandler from "./controllers/error.controller";
import CustomError from "./utils/customError";
import noteRouter from "./routes/note.routes";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.ORIGIN_1!]
        : "http://localhost:4200",
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/notes", noteRouter);
app.all("*", (req, res, next) => {
  const error = new CustomError(
    `Can't find <${req.method} ${req.originalUrl}> on the server!`,
    404
  );
  next(error);
});
app.use(globalErrorHandler);

export = app;
