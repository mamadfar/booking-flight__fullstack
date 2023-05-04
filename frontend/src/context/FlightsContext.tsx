import {createContext} from "react";
import {IFlight} from "../types/Flight.type";

interface IFlightsContext {
    flights: ReadonlyArray<IFlight>;
    isLoading: boolean;
    flightsHandler: (payload: ReadonlyArray<IFlight>) => void;
}

export const FlightsContext = createContext<IFlightsContext>({
    flights: [],
    isLoading: false,
    flightsHandler: () => {}
});
