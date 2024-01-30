import dotenv from "dotenv";

import { IMainConfig } from "../interfaces";

dotenv.config();

export const mainConfig: IMainConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  nodeEnv: process.env.NODE_ENV || "development",
};
