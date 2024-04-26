"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const services_1 = require("../services");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Bucket_1 = require("../utils/s3Bucket");
const imageUrlPreSigner_1 = require("../utils/imageUrlPreSigner");
const utils_1 = require("../utils");
require("dotenv/config");
const port = process.env.REDIS_PORT || "default";
const host = process.env.REDIS_HOST || "localhost";
exports.reportQueue = new bull_1.default("reportQueue", {
    redis: { port: parseInt(port), host: host },
});
exports.reportQueue.process(async function (job, done) {
    try {
        const reportResult = await services_1.userService.userReport(job.data);
        if (reportResult.isError) {
            throw new Error("unable to prepare a report,employee doesn't exsist");
        }
        const fileurl = reportResult?.data || "./src/reports/";
        const file = path_1.default.parse(fileurl);
        const fileData = fs_1.default.readFileSync(fileurl);
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: file.name,
            Body: fileData,
            ContentType: "application/vnd.ms-excel",
        };
        const command = new client_s3_1.PutObjectCommand(params);
        const aws = await s3Bucket_1.s3Client.send(command);
        if (aws.$metadata.httpStatusCode !== 200) {
            throw new Error("unable to save report in s3 bucket");
        }
        const url = await (0, imageUrlPreSigner_1.reportUrlPreSigner)({
            Bucket: process.env.BUCKET_NAME || "ddfdgfdg",
            Key: file.name,
        });
        await services_1.userService.updateReportLog(job.data, file.name, 1);
        const res = await services_1.userService.fetchUser(job.data);
        if (res.data) {
            (0, utils_1.mailerGenerator)({
                to: res.data[0].email,
                subject: `${res.data[0].first_name}-Report`,
                text: `Your report ${url}`,
            });
        }
        done();
    }
    catch (error) {
        await services_1.userService.updateReportLog(job.data, error.message, 0);
    }
});
// reportQueue.on("completed", (job, result) => {
//   console.log(job.data, "data from event");
// });
