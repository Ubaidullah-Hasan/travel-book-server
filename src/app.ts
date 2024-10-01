import express from "express";
import router from "./app/routes";
import cors from "cors";
import cookieParser from 'cookie-parser'
import config from "./app/config";


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

app.get('/', (req, res) => {
    res.send('Server in running')
})



export default app;