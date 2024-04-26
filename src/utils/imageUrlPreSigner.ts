import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./s3Bucket";

export async function reportUrlPreSigner(params: {
  Bucket: string;
  Key: string;
}): Promise<string> {
  const command = new GetObjectCommand(params);
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
