import { NextFunction, Request, Response } from "express";

import { addTranscoderJob } from "../handlers";

const transcoder = async (req: Request, res: Response, next: NextFunction) => {
  const job = await addTranscoderJob(req?.file?.path || "");
  res.json({ job: job.id });
};

export { transcoder };
