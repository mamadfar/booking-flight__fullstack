import React, {FC, forwardRef, LegacyRef} from 'react';
import {Empty, Input, Spin} from "antd";
import {DIRECTION, IAirport} from "../../../../types/Flight.type";
// import {DebouncedFunc} from "lodash";
import withClickOutside, {IWithClickOutsideProps} from "../../../../hoc/WithClickOutside";
import useAirportSearch from "../../../../hooks/useAirportSearch";

// interface IToAirportProps extends IWithClickOutsideProps {
//     to: string;
//
//     setTo(from: string): void;
//     handleSelectedAirport(airport: IAirport, action: "FROM" | "TO", setOpen: ()=> void): void;
//     toResults: IAirport[];
//     getAirportDetailDebouncer: DebouncedFunc<(action: "FROM" | "TO") => Promise<unknown>>;
// }

// todo: [delete]

const ToAirport: FC<IWithClickOutsideProps> = forwardRef(({open, setOpen}, ref: LegacyRef<HTMLDivElement>) => {

    const {to, setTo, toResults, getAirportDetailDebouncer, handleSelectedAirport, isLoading} = useAirportSearch();

    return (
        <div className="relative ml-1" ref={ref}>
            <Input size="large" className="w-full max-w-[200px]" placeholder="To" value={to}
                   onChange={(e) => setTo(e.target.value)}
                   onKeyUp={() => getAirportDetailDebouncer(DIRECTION.TO)}
                   onFocus={() => setOpen(!open)}
                // onBlur={() => setShowResults({from: false, to: false})}
            />
            {open ? (
                <div className="absolute top-10 left-1 z-10 bg-white rounded-md min-w-max max-h-[310px] overflow-y-auto">
                    {!isLoading ? (
                        <>
                        {toResults.length ? (
                            <>
                            {toResults.map(airport => (
                                <div key={airport.ID} onClick={() => handleSelectedAirport(airport, DIRECTION.TO, () => setOpen(!open))}
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

export default withClickOutside(ToAirport);
