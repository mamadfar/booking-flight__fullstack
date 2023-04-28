import React, {FC} from 'react';
import {IAirport} from "../../../../types/Flight.type";

interface IAirportsResultsProps {
    results: ReadonlyArray<IAirport>;
    selectedAirport: (airport: IAirport) => void;
    trigger: "from" | "to";
    setShowResults: (mamad: any) => void;
}

const AirportsResults:FC<IAirportsResultsProps> = ({results, selectedAirport, setShowResults, trigger}) => {

    const closeHandler = (airport: IAirport) => {
        selectedAirport(airport);
        setShowResults({
            from: trigger !== "from",
            to: trigger !== "to",
        })
    }

    return (
        <div className="absolute top-10 left-1 z-10 bg-white rounded-md min-w-max">
            {results.map(airport => (
                <div key={airport.ID} onClick={() => closeHandler(airport)} className="hover:bg-sky-500 hover:text-white last:rounded-b-md first:rounded-t-md p-2 transition duration-75 cursor-pointer">
                    <p>{airport.english_city}</p>
                    <small>{airport.english_airport}</small>
                </div>
            ))}
        </div>
    );
};

export default AirportsResults;
