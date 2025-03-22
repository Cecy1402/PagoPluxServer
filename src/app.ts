import { configureServer, startServer } from "./config/serverConfig";

const initializeApplication = (): void => {
  configureServer();
  startServer();
};

initializeApplication();
