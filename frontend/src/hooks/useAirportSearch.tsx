import React, {useCallback, useState} from 'react';
import {DIRECTION, IAirport} from "../types/Flight.type";
import {searchAirportsService} from "../services/flight.service";
import {debounce} from "lodash";

// todo: [delete]

const useAirportSearch = () => {

    const [to, setTo] = useState<string>("");
    const [toResults, setToResults] = useState<IAirport[]>([]);
    const [from, setFrom] = useState<string>("");
    const [fromResults, setFromResults] = useState<IAirport[]>([]);
    const [fromSelectedAirport, setFromSelectedAirport] = useState<IAirport | null>(null);
    const [toSelectedAirport, setToSelectedAirport] = useState<IAirport | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAirportDetail = useCallback(async (action: DIRECTION) => {
        const controller = new AbortController();
        try {
            setIsLoading(true);
            if (action === "FROM" && from.length >= 3) {
                const {data} = await searchAirportsService(from, controller.signal);
                setFromResults(data);
            } else if (action === "TO" && to.length >= 3) {
                const {data} = await searchAirportsService(to, controller.signal);
                setToResults(data);
            } else {
                setFromResults([]);
                setToResults([]);
            }
            setIsLoading(false);
            // controller.abort();
        } catch (e) {
            setIsLoading(false);
            return e;
        }
    }, [from, to]);

    const getAirportDetailDebouncer = debounce((action: DIRECTION) => getAirportDetail(action), 300);

    //? Grab the whole data of each airport on click on each airport
    const handleSelectedAirport = useCallback((airport: IAirport, action: DIRECTION, setOpen: () => void) => {
        if (action === "FROM") {
            setFromSelectedAirport(airport);
            setFrom(airport.english_city);
        }
        if (action === "TO") {
            setToSelectedAirport(airport);
            setTo(airport.english_city);
        }
        setOpen();
    }, []);

    const checkValidSearchOnBlur = (selectedAirport: IAirport | null, inputValue: string, setInputValue: (inputValue: string) => void) => {
        if (selectedAirport?.english_city && selectedAirport?.english_city.toLowerCase() !== inputValue.toLowerCase()) {
            setInputValue(selectedAirport?.english_city);
        } else if (!selectedAirport?.english_city) {
            setInputValue("");
        }
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
        checkValidSearchOnBlur,
        isLoading
    };
};

export default useAirportSearch;
