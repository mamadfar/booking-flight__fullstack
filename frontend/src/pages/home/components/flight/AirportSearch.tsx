import React, {FC, useEffect, useRef, useState} from 'react';
import {Input} from "antd";
import {MdOutlineChangeCircle} from "react-icons/md";
import {DebouncedFunc} from "lodash";
import {IAirport} from "../../../../types/Flight.type";

interface IAirPortSearchProps {
    from: string;
    setFrom(from: string): void;
    fromResults: IAirport[];
    to: string;
    setTo(to: string): void;
    toResults: IAirport[];
    getAirportDetailDebouncer: DebouncedFunc<(action: "FROM" | "TO") => Promise<unknown>>;
    handleChangePorts: () => void;
    setToSelectedAirport: (airport: IAirport) => void;
    setFromSelectedAirport: (airport: IAirport) => void;
}

const AirportSearch: FC<IAirPortSearchProps> = ({
                                                    from,
                                                    setFrom,
                                                    to,
                                                    setTo,
                                                    getAirportDetailDebouncer,
                                                    handleChangePorts,
                                                    fromResults,
                                                    toResults,
                                                    setToSelectedAirport,
                                                    setFromSelectedAirport
                                                }) => {

    const [showResults, setShowResults] = useState({
        from: false,
        to: false
    });
    const inputRef = useRef<any>(null);

    useEffect(() => {
        // window.addEventListener("click" ,() => {
        //     setShowResults({from: false, to: false})
        // })
    }, [])

    return (
        <>
            <div className="relative mr-1">
                {/*<Select size="large" className="w-32 max-w-[200px]" showSearch value={from}*/}
                {/*         options={fromResults}*/}
                {/*        onSearch={(e) => setFrom(e)} onKeyUp={() => getAirportDetailDebouncer("FROM")}/>*/}
                <Input size="large" className="w-full max-w-[200px]" placeholder="From" value={from}
                       onChange={(e) => setFrom(e.target.value)}
                       onKeyUp={() => getAirportDetailDebouncer("FROM")}
                       onFocus={() => setShowResults({from: true, to: false})}
                    // onBlur={() => setShowResults({from: false, to: false})}
                />
                {(fromResults.length && showResults.from) ? (
                    <div className="absolute top-10 left-1 z-10 bg-white rounded-md min-w-max">
                        {fromResults.map(airport => (
                            <div key={airport.ID} onClick={() => {
                                setShowResults(prevState => ({...prevState, from: false}));
                                setFromSelectedAirport(airport);
                            }} className="hover:bg-sky-500 hover:text-white last:rounded-b-md first:rounded-t-md p-2 transition duration-75 cursor-pointer">
                                <p>{airport.english_city}</p>
                                <small>{airport.english_airport}</small>
                            </div>
                        ))}
                    </div>
                    // <AirportsResults trigger="from" setShowResults={setShowResults}
                    //                  selectedAirport={setFromSelectedAirport} results={fromResults}/>
                ) : null}
            </div>
            <MdOutlineChangeCircle
                onClick={handleChangePorts}
                className="absolute top-2 w-6 h-6 z-10 self-center fill-cyan-700 cursor-pointer"/>
            <div className="relative ml-1">
                <Input size="large" className="w-full max-w-[200px]" placeholder="To" value={to}
                       onChange={(e) => setTo(e.target.value)}
                       onKeyUp={() => getAirportDetailDebouncer("TO")}
                       onFocus={() => setShowResults({from: false, to: true})}
                    // onBlur={() => setShowResults({from: false, to: false})}
                />
                {(toResults.length && showResults.to) ? (
                    <div className="absolute top-10 left-1 z-10 bg-white rounded-md min-w-max">
                        {toResults.map(airport => (
                            <div key={airport.ID} onClick={() => {
                                setShowResults(prevState => ({...prevState, to: false}));
                                setToSelectedAirport(airport);
                            }} className="hover:bg-sky-500 hover:text-white last:rounded-b-md first:rounded-t-md p-2 transition duration-75 cursor-pointer">
                                <p>{airport.english_city}</p>
                                <small>{airport.english_airport}</small>
                            </div>
                        ))}
                    </div>
                    // <AirportsResults trigger="to" setShowResults={setShowResults} selectedAirport={setToSelectedAirport}
                    //                  results={toResults}/>
                ) : null}
            </div>
        </>
    );
};

export default AirportSearch;
