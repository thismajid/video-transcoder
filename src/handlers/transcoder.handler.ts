const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
import { existsSync, mkdirSync } from "fs";

ffmpeg.setFfmpegPath(ffmpegPath);

const { transcoderQueue } = require("../queues");

const qualities = [
  {
    name: "4k",
    resolution: "3840x2160",
    bitrate: "8000k",
    bandwidth: "16000000",
  },
  {
    name: "2k",
    resolution: "2560x1440",
    bitrate: "5000k",
    bandwidth: "10000000",
  },
  {
    name: "1080",
    resolution: "1920x1080",
    bitrate: "3000k",
    bandwidth: "6000000",
  },
  {
    name: "720",
    resolution: "1280x720",
    bitrate: "1500k",
    bandwidth: "3000000",
  },
  {
    name: "480",
    resolution: "854x480",
    bitrate: "800k",
    bandwidth: "1600000",
  },
];

export const transcoderVideo = async (job: {
  filePath: string;
  quality: any;
}): Promise<void> => {
  try {
    const { filePath } = job;

    const outputPath = path.join("./src/uploads/transcodes", `${Date.now()}`);

    if (!existsSync(outputPath)) {
      mkdirSync(outputPath, { recursive: true });
    }

    const promises = qualities.map((quality) => {
      const fileName = path.basename(filePath, path.extname(filePath));
      const fileExtension = path.extname(filePath).toLowerCase();
      const outputFileName = `${fileName}_${quality.name}${fileExtension}`;

      const finalOutputPath = path.join(outputPath, outputFileName);

      return new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
          .videoCodec("libx264")
          .audioCodec("aac")
          .outputOptions([
            "-c:v",
            "libx264",
            "-c:a",
            "aac",
            "-preset",
            "ultrafast",
            "-b:v",
            quality.bitrate,
            "-s",
            quality.resolution,
          ])
          .on("end", () => {
            console.log(`Transcoding completed for ${quality.name}`);
            resolve();
          })
          .on("error", (err: Error) => {
            console.error(`Error transcoding for ${quality.name}: ${err}`);
            reject(err);
          })
          .save(finalOutputPath);
      });
    });

    Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
};

export const addTranscoderJob = async (filePath: string) => {
  return await transcoderQueue.add("transcoder-video", { filePath });
};
