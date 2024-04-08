"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIresponse = void 0;
class APIresponse {
    isError;
    status;
    message;
    data;
    token;
    constructor(isError, status, message, data, token) {
        this.isError = isError;
        this.status = status;
        this.message = message;
        this.data = data;
        this.token = token;
    }
}
exports.APIresponse = APIresponse;
