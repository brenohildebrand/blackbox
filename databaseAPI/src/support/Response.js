"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Response = function (args) {
    var code = args.code, message = args.message, result = args.result;
    return {
        code: code,
        message: message,
        result: result,
    };
};
exports.default = Response;
