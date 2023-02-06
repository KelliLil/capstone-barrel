import dotenv from "dotenv";

dotenv.config();

export default {
  dbConn: process.env.DB_CONN,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
  saltRounds: Number(process.env.SALT_ROUNDS),
};
