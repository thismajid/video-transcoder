import app from "./app";
import { mainConfig } from "./configs";

const { port } = mainConfig;

const api = app.listen(port, () => {
  console.info(`Transcoder running on port: ${port} ...`);
});

export default api;
