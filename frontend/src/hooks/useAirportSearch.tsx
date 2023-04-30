import React, {useState} from 'react';
import {DIRECTION, IAirport} from "../types/Flight.type";
import {searchAirportsService} from "../services/flight.service";
import {debounce} from "lodash";

const useAirportSearch = () => {

    const [to, setTo] = useState<string>("");
    const [toResults, setToResults] = useState<IAirport[]>([]);
    const [from, setFrom] = useState<string>("");
    const [fromResults, setFromResults] = useState<IAirport[]>([]);
    const [fromSelectedAirport, setFromSelectedAirport] = useState<IAirport | null>(null);
    const [toSelectedAirport, setToSelectedAirport] = useState<IAirport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAirportDetail = async (action: DIRECTION) => {
        const controller = new AbortController();
        if (from.length >= 3 || to.length >= 3) {
            setIsLoading(true);
            try {
                if (action === "FROM") {
                    const {data} = await searchAirportsService(from, controller.signal);
                    setFromResults(data);
                } else {
                    const {data} = await searchAirportsService(to, controller.signal);
                    setToResults(data);
                }
                setIsLoading(false);
                // controller.abort();
            } catch (e) {
                setIsLoading(false);
                return e;
            }
        } else {
            setFromResults([]);
            setToResults([]);
        }
    };

    const getAirportDetailDebouncer = debounce((action: DIRECTION) => getAirportDetail(action), 300);

    //? Grab the whole data of each airport on click on each airport
    const handleSelectedAirport = (airport: IAirport, action: DIRECTION, setOpen: () => void) => {
        if (action === "FROM") {
            setFromSelectedAirport(airport);
            setFrom(airport.english_city);
        }
        if (action === "TO") {
            setToSelectedAirport(airport);
            setTo(airport.english_city);
        }
        setOpen();
    };

    //? Handle switch ports
    const handleChangePorts = () => {
        setFrom(to);
        setTo(from);
        setFromResults(toResults);
        setToResults(fromResults);
        setFromSelectedAirport(toSelectedAirport);
        setToSelectedAirport(fromSelectedAirport);
    }

    return {
        to,
        setTo,
        toResults,
        setToResults,
        toSelectedAirport,
        from,
        setFrom,
        fromResults,
        setFromResults,
        fromSelectedAirport,
        getAirportDetailDebouncer,
        handleSelectedAirport,
        handleChangePorts,
        isLoading
    };
};

export default useAirportSearch;
