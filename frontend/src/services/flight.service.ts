import API from "../config/API";
import {IResponse} from "../types/Auth.type";
import {IAirport} from "../types/Flight.type";

export const searchAirportsService = (query: string, signal: AbortSignal): Promise<IResponse<IAirport[]>> => {
    return API.post("/autocomplete", {
        query
    }, {signal});
};

export const searchTicketService = (information: any) => {
    return API.post("/search", information);
};
