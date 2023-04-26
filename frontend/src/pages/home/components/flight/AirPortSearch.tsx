import React, {FC} from 'react';
import {Input} from "antd";
import {MdOutlineChangeCircle} from "react-icons/md";
import {DebouncedFunc} from "lodash";

interface IAirPortSearch {
    from: string;
    setFrom(from: string): void;
    to: string;
    setTo(to: string): void;
    getAirportDetailDebouncer: DebouncedFunc<(action: "FROM" | "TO") => Promise<unknown>>
}

const AirPortSearch: FC<IAirPortSearch> = ({from, setFrom, to, setTo, getAirportDetailDebouncer}) => {
    return (
        <>
            <Input size="large" className="w-full max-w-[200px] mr-1" placeholder="From" value={from}
                   onChange={(e) => setFrom(e.target.value)}
                   onKeyUp={() => getAirportDetailDebouncer("FROM")}/>
            <MdOutlineChangeCircle
                className="absolute top-2 w-6 h-6 z-10 self-center fill-cyan-700 cursor-pointer"/>
            <Input size="large" className="w-full max-w-[200px] ml-1" placeholder="To" value={to}
                   onChange={(e) => setTo(e.target.value)}
                   onKeyUp={() => getAirportDetailDebouncer("TO")}/>
        </>
    );
};

export default AirPortSearch;
