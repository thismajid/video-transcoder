import express from "express";

import { errorHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

export default app;
