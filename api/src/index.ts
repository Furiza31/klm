import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Response } from "express";
import middlewares from "./middlewares";
import routes from "./routes/index";
import { TypedRequest } from "./types/express-request-type";
import bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(middlewares());
app.use(routes());

app.get("/", (_: TypedRequest<{}, {}>, res: Response) => {
  res.redirect("/health");
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
