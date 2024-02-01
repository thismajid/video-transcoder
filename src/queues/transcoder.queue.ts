import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

import { transcoderVideo } from "../handlers";

const connection = new IORedis({
  maxRetriesPerRequest: null,
});

export const transcoderQueue = new Queue("video-transcoding-queue", {
  connection,
});

export const transcoderWorker = new Worker(
  "video-transcoding-queue",
  async (job) => {
    return await transcoderVideo(job.data.filePath);
  },
  {
    connection,
  }
);
