import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}));


app.post("/api/v1/auth", async (req: Request, res: Response) => {
    const body = req.body;

    const {data} = await axios.post("https://test.bilifo.com/api/v3/flight/auth", body);
    console.log(data);
    res.status(200).json(data);
});

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json("pong!");
});

app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`));