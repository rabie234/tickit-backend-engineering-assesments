import type { AppConfig } from "./config/app.config";

export {};

declare global {
  namespace NodeJS {
    interface Global {
      __config: AppConfig;
    }
  }

  var __config: AppConfig;
}
