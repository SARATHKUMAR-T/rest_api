"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportUrlPreSigner = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3Bucket_1 = require("./s3Bucket");
async function reportUrlPreSigner(params) {
    const command = new client_s3_1.GetObjectCommand(params);
    return await (0, s3_request_presigner_1.getSignedUrl)(s3Bucket_1.s3Client, command, { expiresIn: 3600 });
}
exports.reportUrlPreSigner = reportUrlPreSigner;
