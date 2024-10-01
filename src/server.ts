/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app"
import { Server } from "http";
import config from "./app/config";
const port = config.port;

let server: Server;

async function main() {
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    await mongoose.connect(config.database_url as string)
    console.log("MongoDB Connected!")
}

main();

process.on("unhandledRejection", () => {
    console.log("Unhandled rejection is detected, Sutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
});

process.on("uncaughtException", () => {
    console.log("UncaughtException rejection is detected, Sutting down...");
    process.exit(1);
})