"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIresponse = void 0;
class APIresponse {
    isError;
    status;
    message;
    data;
    constructor(isError, status, message, data) {
        this.isError = isError;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.APIresponse = APIresponse;
