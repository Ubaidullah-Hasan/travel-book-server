import dotenv from "dotenv";
import path from "path";

// console.log({path: path.join(process.cwd(), ".env")})
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  client_url: process.env.CLIENT_URL,
};
