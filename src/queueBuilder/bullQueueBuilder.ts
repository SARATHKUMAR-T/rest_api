import Queue from "bull";
import { userService } from "../services";
import path from "path";
import fs from "fs";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Bucket";
import { reportUrlPreSigner } from "../utils/imageUrlPreSigner";
import { mailerGenerator } from "../utils";
import "dotenv/config";

const port = process.env.REDIS_PORT || "default";
const host = process.env.REDIS_HOST || "localhost";

export const reportQueue = new Queue("reportQueue", {
  redis: { port: parseInt(port), host: host },
});

reportQueue.process(async function (job, done) {
  try {
    const reportResult = await userService.userReport(job.data);
    if (reportResult.isError) {
      throw new Error("unable to prepare a report,employee doesn't exsist");
    }
    const fileurl = reportResult?.data || "./src/reports/";
    const file = path.parse(fileurl);
    const fileData = fs.readFileSync(fileurl);
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: file.name,
      Body: fileData,
      ContentType: "application/vnd.ms-excel",
    };
    const command = new PutObjectCommand(params);
    const aws = await s3Client.send(command);
    if (aws.$metadata.httpStatusCode !== 200) {
      throw new Error("unable to save report in s3 bucket");
    }
    const url = await reportUrlPreSigner({
      Bucket: process.env.BUCKET_NAME || "ddfdgfdg",
      Key: file.name,
    });
    await userService.updateReportLog(job.data, file.name, 1);
    const res = await userService.fetchUser(job.data);
    if (res.data) {
      mailerGenerator({
        to: res.data[0].email,
        subject: `${res.data[0].first_name}-Report`,
        text: `Your report ${url}`,
      });
    }
    done();
  } catch (error: Error | any) {
    await userService.updateReportLog(job.data, error.message, 0);
  }
});

// reportQueue.on("completed", (job, result) => {
//   console.log(job.data, "data from event");
// });
