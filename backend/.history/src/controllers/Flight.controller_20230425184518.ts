import { NextFunction, Request, Response } from "express";
import HttpError from "../models/http-error";
import axios from "axios";

export const searchAirport = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.body;

    try {
        const {data} = await axios.post("/autocomplete", body);
        res.status(200).json(data);
    } catch (error) {
        return next(new HttpError("Please check your data.", 400));
    }
}