"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.delete = exports.update = exports.read = exports.create = exports.open = void 0;
/*
  This file is meant to export all avaiable
  functions of the databaseAPI.
*/
var OpenDB_1 = require("./OpenDB");
Object.defineProperty(exports, "open", { enumerable: true, get: function () { return __importDefault(OpenDB_1).default; } });
var CreateDB_1 = require("./create/CreateDB");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return __importDefault(CreateDB_1).default; } });
var ReadDB_1 = require("./read/ReadDB");
Object.defineProperty(exports, "read", { enumerable: true, get: function () { return __importDefault(ReadDB_1).default; } });
var UpdateDB_1 = require("./update/UpdateDB");
Object.defineProperty(exports, "update", { enumerable: true, get: function () { return __importDefault(UpdateDB_1).default; } });
var DeleteDB_1 = require("./delete/DeleteDB");
Object.defineProperty(exports, "delete", { enumerable: true, get: function () { return __importDefault(DeleteDB_1).default; } });
var CloseDB_1 = require("./CloseDB");
Object.defineProperty(exports, "close", { enumerable: true, get: function () { return __importDefault(CloseDB_1).default; } });
