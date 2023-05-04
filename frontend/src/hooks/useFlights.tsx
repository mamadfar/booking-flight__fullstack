import {FC, ReactNode, useCallback, useContext} from 'react';
import {FlightsContext} from "../context/FlightsContext";
import {useImmerReducer} from "use-immer";
import {IFlight} from "../types/Flight.type";

export const useFlights = () => {

    const flightsContext = useContext(FlightsContext);

    if (!flightsContext) throw new Error("Something went wrong!");

    return flightsContext;
};

interface IInitialState {
    flights: ReadonlyArray<IFlight>;
    isLoading: boolean;
}

const initialState: IInitialState = {
    flights: [],
    isLoading: true
}

const ticketsReducer = (draft: IInitialState, action: any) => {
    switch (action.type) {
        case "GET_TICKETS":
            draft.isLoading = false;
            draft.flights = action.payload;
            break;
        default: return draft;
    }
}

const FlightsProvider:FC<{children: ReactNode}> = ({children}) => {

    const [{flights, isLoading}, dispatch] = useImmerReducer(ticketsReducer, initialState);

    const value = {
        flights,
        isLoading,
        flightsHandler: useCallback((payload: ReadonlyArray<IFlight>) => {
            dispatch({type: "GET_TICKETS", payload})
        }, [dispatch])
    }

    return <FlightsContext.Provider value={value}>{children}</FlightsContext.Provider>
}

export default FlightsProvider;
