/// <reference path="./global.d.ts" />

import express, { Express } from "express";
import App from "./app";
import config from "./config/app.config";

globalThis.__config = config;

const app: Express = express();
const port: number = config.server.port;

App.initializeApp(app).then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
