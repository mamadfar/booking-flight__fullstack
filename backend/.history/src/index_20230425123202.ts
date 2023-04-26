import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoutes from "./routes/Auth.route";

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

//? Server
app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`));