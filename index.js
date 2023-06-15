import connectDB from "./DB/connection.js";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import initApp from "./src/Modules/app.router.js";
import { sendEmail } from "./src/services/sendEmails.js";
const app = express();
const PORT = 3000;

initApp(app, express);

connectDB().then(() => {
  app.listen(process.env.PORT || PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
});
