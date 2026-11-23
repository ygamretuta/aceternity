import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { requireEnv } from "@/lib/env";

const UPLOAD_URL_TTL_SECONDS = 300;

export type PresignedUpload = { url: string; key: string };

function createClient(): S3Client {
  return new S3Client({
    region: requireEnv("S3_REGION"),
    credentials: {
      accessKeyId: requireEnv("S3_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("S3_SECRET_ACCESS_KEY"),
    },
  });
}

/** Returns a short-lived URL the browser can PUT a file to directly. */
export async function createPresignedUpload(
  key: string,
  contentType: string,
): Promise<PresignedUpload> {
  const command = new PutObjectCommand({
    Bucket: requireEnv("S3_BUCKET"),
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(createClient(), command, { expiresIn: UPLOAD_URL_TTL_SECONDS });
  return { url, key };
}
