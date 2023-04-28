import React, {FC, forwardRef, LegacyRef} from 'react';
import {Input} from "antd";
import {IAirport} from "../../../../types/Flight.type";
import {DebouncedFunc} from "lodash";
import withClickOutside, {IWithClickOutsideProps} from "../../../../hooks/WithClickOutside";

interface IToAirportProps extends IWithClickOutsideProps {
    to: string;

    setTo(from: string): void;
    handleSelectedAirport(airport: IAirport, action: "FROM" | "TO", setOpen: ()=> void): void;
    toResults: IAirport[];
    getAirportDetailDebouncer: DebouncedFunc<(action: "FROM" | "TO") => Promise<unknown>>;
}

const ToAirport: FC<IToAirportProps> = forwardRef(({
                                                       to,
                                                       setTo,
                                                       toResults,
                                                       getAirportDetailDebouncer,
                                                       open,
                                                       setOpen,
                                                       handleSelectedAirport
                                                   }, ref: LegacyRef<HTMLDivElement>) => {
    return (
        <div className="relative ml-1" ref={ref}>
            <Input size="large" className="w-full max-w-[200px]" placeholder="To" value={to}
                   onChange={(e) => setTo(e.target.value)}
                   onKeyUp={() => getAirportDetailDebouncer("TO")}
                   onFocus={() => setOpen(!open)}
                // onBlur={() => setShowResults({from: false, to: false})}
            />
            {open ? (
                <div className="absolute top-10 left-1 z-10 bg-white rounded-md min-w-max max-h-[310px] overflow-y-auto">
                    {toResults ? (
                        <>
                            {toResults.map(airport => (
                                <div key={airport.ID} onClick={() => handleSelectedAirport(airport, "TO", () => setOpen(!open))}
                                     className="hover:bg-sky-500 hover:text-white last:rounded-b-md first:rounded-t-md p-2 transition duration-75 cursor-pointer">
                                    <p>{airport.english_city}</p>
                                    <small>{airport.english_airport}</small>
                                </div>
                            ))}
                        </>
                    ) : (<h3>There is no such data!</h3>)}
                </div>
            ) : null}
        </div>
    );
});

export default withClickOutside(ToAirport);
