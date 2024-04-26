import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import "dotenv/config";

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

export const s3Client = new S3Client({
  region: region || "region",
  credentials: {
    accessKeyId: accessKeyId || "sdfdsf",
    secretAccessKey: secretAccessKey || "dsdsa",
  },
});
