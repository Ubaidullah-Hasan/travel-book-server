import express, { Request, Response } from "express";
import router from "./app/routes";
import cors from "cors";
import cookieParser from 'cookie-parser'
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";


const app = express();

app.use(
    cors({
        credentials: true,
        origin: [config.client_url as string],
    })
);
app.use(cookieParser());

//parser
app.use(express.json());

app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
    res.send('Server in running')
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