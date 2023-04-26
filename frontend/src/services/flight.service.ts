import API from "../config/API";
import {IResponse} from "../types/Auth.type";
import {ISearchAirport} from "../types/Flight.type";

export const searchAirportsService = (query: string, signal: AbortSignal): Promise<IResponse<ReadonlyArray<ISearchAirport>>> => {
    return API.post("/autocomplete", {
        query
    }, {signal});
};

export const searchTicketService = (information: any) => {
    return API.post("/search", {
        "TwoWay": false,
        "Adult": 1,
        "Child": 0,
        "Infant": 0,
        "FlightClass": "e",
        "Segments": [
            {
                "Source": "MOW",
                "Destination": "IST",
                "Date": "2023-05-14",
                "ReturnDate": ""
            }
        ]
    });
};
