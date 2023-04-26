import { Request, Response } from "express";
import axios from "axios";

export const getCredential = async (req: Request, res: Response) => {
    const body = req.body;

    try {
        const {data} = await axios.post("https://test.bilifo.com/api/v3/flight/auth", body);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: "Something went wrong!"});
    }
};