"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const languages = [
    "abap",
    "apex",
    "azcli",
    "bat",
    "bicep",
    "cameligo",
    "clojure",
    "coffee",
    "cpp",
    "csharp",
    "csp",
    "css",
    "cypher",
    "dart",
    "dockerfile",
    "ecl",
    "elixir",
    "flow9",
    "fsharp",
    "freemarker2",
    "go",
    "graphql",
    "handlebars",
    "hcl",
    "html",
    "ini",
    "java",
    "javascript",
    "julia",
    "kotlin",
    "less",
    "lexon",
    "lua",
    "liquid",
    "m3",
    "markdown",
    "mdx",
    "mips",
    "msdax",
    "mysql",
    "objective-c",
    "pascal",
    "pascaligo",
    "perl",
    "pgsql",
    "php",
    "pla",
    "postiats",
    "powerquery",
    "powershell",
    "protobuf",
    "pug",
    "python",
    "qsharp",
    "r",
    "razor",
    "redis",
    "redshift",
    "restructuredtext",
    "ruby",
    "rust",
    "sb",
    "scala",
    "scheme",
    "scss",
    "shell",
    "solidity",
    "sophia",
    "sparql",
    "sql",
    "st",
    "swift",
    "systemverilog",
    "tcl",
    "twig",
    "typescript",
    "typespec",
    "vb",
    "wgsl",
    "xml",
    "yaml",
];
const noteSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: [true, "Your content is empty."],
        trim: true,
    },
    language: {
        type: String,
        required: [true, "You must specify a programming language."],
        enum: {
            values: languages,
            message: "<{VALUE}> is not a known programming language.",
        },
    },
}, { timestamps: true });
const Note = mongoose_1.default.model("Note", noteSchema);
exports.default = Note;
