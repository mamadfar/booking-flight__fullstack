import { NextFunction, Request, Response } from "express";
import API from "../config/API";

import HttpError from "../models/http-error";
console.log("mamad")
export const searchAirport = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.body;
console.log("first")
    try {
        const {data} = await API.post("/autocomplete", query);
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        return next(new HttpError("Please check your data.", 400));
    }
}