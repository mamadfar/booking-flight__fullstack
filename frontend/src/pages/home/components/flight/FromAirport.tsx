import React, {FC, forwardRef, LegacyRef} from 'react';
import {Empty, Input, Spin} from "antd";
import {DIRECTION, IAirport} from "../../../../types/Flight.type";
// import {DebouncedFunc} from "lodash";
import withClickOutside, {IWithClickOutsideProps} from "../../../../hoc/WithClickOutside";
import useAirportSearch from "../../../../hooks/useAirportSearch";

// export interface IFromAirportProps extends IWithClickOutsideProps{
//     from: string;
//     setFrom(from: string): void;
//     handleSelectedAirport(airport: IAirport, action: "FROM" | "TO", setOpen: ()=> void): void;
//     fromResults: IAirport[];
//     getAirportDetailDebouncer: DebouncedFunc<(action: "FROM" | "TO") => Promise<unknown>>;
// }

const FromAirport: FC<IWithClickOutsideProps> = forwardRef(({open, setOpen}, ref: LegacyRef<HTMLDivElement>) => {

    const {from, setFrom, fromResults, getAirportDetailDebouncer, handleSelectedAirport, isLoading} = useAirportSearch();

    return (
        <div className="relative mr-1" ref={ref}>
            <Input size="large" className="w-full max-w-[200px]" placeholder="From" value={from}
                   onChange={(e) => setFrom(e.target.value)}
                   onKeyUp={() => getAirportDetailDebouncer(DIRECTION.FROM)}
                   onFocus={() => setOpen(!open)}
                   // onBlur={() => setIsOpen(false)}
            />
            {open ? (
                <div className="absolute top-10 left-0 z-10 bg-white rounded-md w-full min-w-max max-h-[310px] overflow-y-auto">
                    {!isLoading ? (
                        <>
                            {fromResults.length ? (
                                <>
                                    {fromResults.map((airport:any) => (
                                        <div key={airport.ID} onClick={() => handleSelectedAirport(airport, DIRECTION.FROM, () => setOpen(!open))}
                                             className="hover:bg-sky-500 hover:text-white last:rounded-b-md first:rounded-t-md p-2 transition duration-75 cursor-pointer">
                                            <p>{airport.english_city}</p>
                                            <small>{airport.english_airport}</small>
                                        </div>
                                    ))}
                                </>
                            ) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}
                        </>
                    ) : (
                        <div className="h-32 flex justify-center items-center">
                            <Spin spinning/>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
});

export default withClickOutside(FromAirport);
