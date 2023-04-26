import { NextFunction, Request, Response } from "express";
import API from "../config/API";

import HttpError from "../models/http-error";

export const getCredential = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    try {
        const {data} = await API.post("/auth", user);
        res.status(200).json(data);
    } catch (error) {
        return next(new HttpError("Please check your username and password", 400));
    }
};

export const searchAirport = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.body;
    const Authorization = req.headers.authorization;
    try {
        const {data} = await API.post("/autocomplete", query, {
            headers: {
                Authorization
            }
        });
        console.log(data)
        res.status(200).json(data);
    } catch (error) {
        return next(new HttpError("Please check your data.", 400));
    }
}