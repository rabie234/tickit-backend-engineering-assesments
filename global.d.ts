import type { AppConfig } from "./config/app.config";

export {};

declare module "express-serve-static-core" {
  interface Request {
    user?: Omit<IUser, "password">;
  }
}
declare global {
  namespace NodeJS {
    interface Global {
      __config: AppConfig;
    }
  }

  var __config: AppConfig;
}
