import { DataBase } from "./data-source";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

const main = async () => {
  DataBase.initialize().then(async () => {
    const app = express();
    app.use(bodyParser.json(), cookieParser());
    app.use(cors());

    app.use(router);

    app.listen(3001, () => {
      console.log("Server listening on port: 3001");
    });
  });
};

main();
