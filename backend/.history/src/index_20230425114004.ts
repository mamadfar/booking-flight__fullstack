import axios from "axios";
import express, { Request, Response } from "express";

const app = express();

app.post("/api/v1/auth", async (req: Request, res: Response) => {
    const body = req.body;

    const {data} = await axios.post("https://test.bilifo.com/api/v3/flight/auth", body);
    console.log(data);

});

app.get("/ping", (req: Request, res: Response) => {
    res.status(200).json("pong!");
});

app.listen(5000, ()=> console.log("Server is running..."));