import React, {FC, forwardRef, LegacyRef} from 'react';
import {Empty, Input, Spin} from "antd";
import {DebouncedFunc} from "lodash";
import {DIRECTION, IAirport} from "../../../../types/Flight.type";
import withClickOutside, {IWithClickOutsideProps} from "../../../../hoc/WithClickOutside";

interface IAirPortSearchProps {
    searchResults: IAirport[];
    handleSelectedAirport: (airport: IAirport, direction: DIRECTION, setOpen: () => void) => void;
    selectedAirport: IAirport | null;
    name: DIRECTION;
    value: string;
    setValue: (value: string) => void;
    direction: DIRECTION;
    getAirportDetailDebouncer: DebouncedFunc<(action: "FROM" | "TO") => Promise<unknown>>;
    checkValidSearchOnBlur: (selectedAirport: IAirport | null, value: string, setValue: (value: string) => void) => void;
    isLoading: boolean;
}

const AirportSearch: FC<IAirPortSearchProps & IWithClickOutsideProps> = forwardRef(({
                                                                                        searchResults,
                                                                                        handleSelectedAirport,
                                                                                        name,
                                                                                        value,
                                                                                        setValue,
                                                                                        direction,
                                                                                        getAirportDetailDebouncer,
                                                                                        checkValidSearchOnBlur,
                                                                                        isLoading,
                                                                                        selectedAirport,
                                                                                        open,
                                                                                        setOpen
                                                                                    }, ref: LegacyRef<HTMLDivElement>) => {
    return (
        <div className="relative mr-1" ref={ref}>
            <Input size="large" className="w-full max-w-[200px]" placeholder={name} value={value}
                   onChange={e => {
                       setValue(e.target.value);
                       getAirportDetailDebouncer(direction);
                   }}
                // onKeyUp={() => getAirportDetailDebouncer(direction)}
                   onFocus={() => setOpen(!open)}
                   onBlur={() => checkValidSearchOnBlur(selectedAirport, value, setValue)}
            />
            {open ? (
                <div
                    className="absolute top-10 left-0 z-10 bg-white rounded-md w-full min-w-max max-h-[310px] overflow-y-auto">
                    {!isLoading ? (
                        <>
                            {searchResults.length ? (
                                <>
                                    {searchResults.map((airport: any) => (
                                        <div key={airport.ID}
                                             onClick={() => handleSelectedAirport(airport, direction, () => setOpen(!open))}
                                             className="hover:bg-sky-500 hover:text-white last:rounded-b-md first:rounded-t-md p-2 transition duration-75 cursor-pointer">
                                            <p>{airport.english_city}</p>
                                            <small>{airport.english_airport}</small>
                                        </div>
                                    ))}
                                </>
                            ) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>)}
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

export default withClickOutside(AirportSearch);
