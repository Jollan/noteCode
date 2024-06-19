"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.createNote = exports.getNote = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const note_model_1 = __importDefault(require("../models/note.model"));
const customError_1 = __importDefault(require("../utils/customError"));
exports.getNote = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_model_1.default.findById(req.params.id);
    if (!note) {
        throw new customError_1.default("The note you try to get is not found.", 404);
    }
    res.status(200).json({
        status: "success",
        data: { note },
    });
}));
exports.createNote = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_model_1.default.create(req.body);
    res.status(201).json({
        status: "success",
        data: { note },
    });
}));
exports.updateNote = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedNote = yield note_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedNote) {
        throw new customError_1.default("The note you try to update is not found.", 404);
    }
    res.status(200).json({
        status: "success",
        data: { note: updatedNote },
    });
}));
