import dotenv from "dotenv";
dotenv.config();

interface ServerConfig {
  baseUrl: string;
  port: number;
}

interface MongoConfig {
  databaseURL: string;
  options: Record<string, unknown>;
}

export interface JwtConfig {
  access: {
    secret: string;
  };
  refresh?: {
    secret: string;
    expiresIn: string;
  };
}
export interface AppConfig {
  env: string;
  server: ServerConfig;
  mongo: MongoConfig;
  jwt: JwtConfig;
}

const config: AppConfig = {
  env: process.env.NODE_ENV || "development",

  server: {
    baseUrl: `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
    port: Number(process.env.SERVER_PORT) || 3000,
  },

  mongo: {
    databaseURL:
      process.env.DB_URL ||
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?directConnection=true&serverSelectionTimeoutMS=2000`,
    options: {},
  },

  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || "kg#765fijTY",
    },
  },
};

export default config;
