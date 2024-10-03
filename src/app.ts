import express, { Request, Response } from "express";
import router from "./app/routes";
import cors from "cors";
import cookieParser from 'cookie-parser'
import config from "./app/config";
import routeNotFound from "./app/middlewares/routeNotFound";
import AppError from "./app/errors/AppError";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


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
app.use(routeNotFound); // todo



export default app;