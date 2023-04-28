import React, {FC, forwardRef, LegacyRef} from 'react';
import {Input} from "antd";
import {DIRECTION, IAirport} from "../../../../types/Flight.type";
import {DebouncedFunc} from "lodash";
import withClickOutside, {IWithClickOutsideProps} from "../../../../hooks/WithClickOutside";

export interface IFromAirportProps extends IWithClickOutsideProps{
    from: string;
    setFrom(from: string): void;
    handleSelectedAirport(airport: IAirport, action: "FROM" | "TO", setOpen: ()=> void): void;
    fromResults: IAirport[];
    getAirportDetailDebouncer: DebouncedFunc<(action: "FROM" | "TO") => Promise<unknown>>;
}

const FromAirport: FC<IFromAirportProps> = forwardRef(({from, setFrom, fromResults, getAirportDetailDebouncer, open, setOpen, handleSelectedAirport}, ref: LegacyRef<HTMLDivElement>) => {

    return (
        <div className="relative mr-1" ref={ref}>
            <Input size="large" className="w-full max-w-[200px]" placeholder="From" value={from}
                   onChange={(e) => setFrom(e.target.value)}
                   onKeyUp={() => getAirportDetailDebouncer("FROM")}
                   onFocus={() => setOpen(!open)}
                   // onBlur={() => setIsOpen(false)}
            />
            {open ? (
                <div className="absolute top-10 left-1 z-10 bg-white rounded-md min-w-max max-h-[310px] overflow-y-auto">
                    {fromResults?.length ? (
                        <>
                            {fromResults.map((airport:any) => (
                                <div key={airport.ID} onClick={() => handleSelectedAirport(airport, "FROM", () => setOpen(!open))}
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

export default withClickOutside(FromAirport);
