import { NextFunction, Request, Response} from "express";

import HttpError from "../models/http-error";
import { AirportService, TicketService } from "../services/flight.service";
import { AuthService } from "../services/auth.service";

export const getCredential = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  try {
    const { data } = await AuthService(user);
    res.status(200).json(data);
  } catch (error) {
    return next(new HttpError("Please check your username and password", 400));
  }
};

export const searchAirport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.body;
  const Authorization = req.headers.authorization;
  try {
    const { data } = await AirportService(query, Authorization);
    res.status(200).json(data);
  } catch (error) {
    return next(new HttpError("Please check your data.", 400));
  }
};

export const searchTicket = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.body;
  const Authorization = req.headers.authorization;
  console.log(query)
  try {
    const {data} = await TicketService(query, Authorization);
    res.status(200).json(data);
  } catch (error) {
    return next(new HttpError("Please check your data.", 404));
  }
}