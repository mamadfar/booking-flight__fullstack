import { Request, Response } from "express";
import axios from "axios";

export const getCredential = async (req: Request, res: Response) => {
    const body = req.body;

    try {
        const {data} = await axios.post("", body);
    } catch (error) {
        res.status(500).json({message: "Something went wrong!"});
    }
}