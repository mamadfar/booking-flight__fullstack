import { NextFunction, Request, Response } from "express";
import axios from "axios";
import HttpError from "../models/http-error";

export const getCredential = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    try {
        const {data} = await axios.post("/auth", user);
        res.status(200).json(data);
    } catch (error) {
        return next(new HttpError("Please check your username and password", 400));
    }
};