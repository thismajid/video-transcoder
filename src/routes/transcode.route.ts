import { Router } from "express";

import { fileUploader } from "../middlewares";

const transcodeRouter = Router();

transcodeRouter.post("/", fileUploader.single("file"));

export { transcodeRouter };
