const { transcoderQueue } = require("../queues");

export const transcoderVideo = (filePath: string) => {
  console.log("xxxxxxx");
};

export const addTranscoderJob = async (filePath: string) => {
  return transcoderQueue.add("transcoder-video", { filePath });
};
