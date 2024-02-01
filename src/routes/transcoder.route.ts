import { Router } from "express";

import { fileUploader } from "../middlewares";
import { transcoder } from "../controllers";

const transcoderRouter = Router();

transcoderRouter.post("/", fileUploader.single("file"), transcoder);

export { transcoderRouter };
