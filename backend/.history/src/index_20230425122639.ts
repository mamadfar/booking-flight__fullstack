import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoutes from "./routes/Auth.route";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}));


app.use("/api/v1/auth", AuthRoutes);

//? Health Route
app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json("pong!");
});

app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`));