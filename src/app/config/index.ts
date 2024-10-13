import dotenv from "dotenv";
import path from "path";

// console.log({path: path.join(process.cwd(), ".env")})
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  client_url: process.env.CLIENT_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  payment_url: process.env.PAYMENT_URL,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  verify_payment_url: process.env.VERIRY_PAYMENT_URL,
  backend_url: process.env.BACKEND_URL
};
