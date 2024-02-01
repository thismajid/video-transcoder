import express from "express";

import { errorHandler } from "./middlewares";
import { transcoderRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/transcode", transcoderRouter);

app.use(errorHandler);

export default app;
