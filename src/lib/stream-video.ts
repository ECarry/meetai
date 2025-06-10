import "server-only";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY as string;
const secret = process.env.STREAM_VIDEO_SECRET_KEY as string;

export const streamVideo = new StreamClient(apiKey, secret);
