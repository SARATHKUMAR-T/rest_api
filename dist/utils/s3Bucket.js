"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
require("dotenv/config");
const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
exports.s3Client = new client_s3_1.S3Client({
    region: region || "region",
    credentials: {
        accessKeyId: accessKeyId || "sdfdsf",
        secretAccessKey: secretAccessKey || "dsdsa",
    },
});
