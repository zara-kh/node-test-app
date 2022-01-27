import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import router from "./router/router";
const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(function (req: Request, res: Response, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

app.listen(PORT, (): void => {
    console.log(`Server Running here https://localhost:${PORT}`);
});