import express, { Request, Response } from "express";
import router from "./app/routes";
import cors from "cors";
import cookieParser from 'cookie-parser'
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";
import path from "path";


const app = express();

app.use(
    cors({
        origin: config.client_url as string,
        credentials: true,
    })
);
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, './assets'))); // assets folder declaration


//parser
app.use(express.json());

app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
    res.send('Server in running');
})

//global error handler
app.use(globalErrorHandler);

// not found middleware

app.use((req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Api route not found!",
        error: "",
    })
})



export default app;