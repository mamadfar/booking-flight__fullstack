import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import {AuthRoutes} from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//? Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}));

//? Routes
app.use("/api/v1/auth", AuthRoutes);

//? Health Route
app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json("pong!");
});

//? Rules of our API
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        res.status(200).json({});
    };
    next();
});

//? Error Handling
app.use((error, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent) return next(error);
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred!"});
});

//? Server
app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`));