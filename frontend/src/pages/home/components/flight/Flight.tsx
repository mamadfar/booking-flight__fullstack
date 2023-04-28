import React, {useEffect, useRef, useState} from 'react';
import {Button, DatePicker, Form} from "antd";
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import useAuth from "../../../../hooks/useAuth";
import {searchAirportsService, searchTicketService} from "../../../../services/flight.service";
import type {
    DIRECTION,
    FlightClassType,
    IPassengers,
    IPassengersTypeList,
    IAirport,
    PassengersType,
    BookerType
} from "../../../../types/Flight.type";
import {debounce} from "lodash";
import TicketType from "./TicketType";
import AirportSearch from "./AirportSearch";
import Passengers from "./Passengers";
import {MdOutlineChangeCircle} from "react-icons/md";
import FromAirport from "./FromAirport";
import ToAirport from "./ToAirport";

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today
    return current && current < dayjs(new Date().setDate(new Date().getDate() - 1));
};

const PASSENGERS_TYPE_LIST: ReadonlyArray<IPassengersTypeList> = [
    {
        id: 1,
        name: "adult",
        value: 1
    },
    {
        id: 2,
        name: "child",
        value: 0
    },
    {
        id: 3,
        name: "infant",
        value: 0
    },
    {
        id: 4,
        name: "student",
        value: 0
    },
]

// export interface IInitialState {
//     ticketType: BookerType,
//     flightClass: FlightClassType,
//     fromResults: ReadonlyArray<ISearchAirport> | null,
//     from: string,
//     toResults: ReadonlyArray<ISearchAirport> | null,
//     to: string,
// }
//
// const initialState: IInitialState = {
//     ticketType: "round-trip",
//     flightClass: "Economy",
//     fromResults: [],
//     from: "",
//     toResults: [],
//     to: "",
// }
//
// const flightReducer = (draft: IInitialState, action: any): any => {
//     switch (action.type) {
//         case (TICKET_TYPE):
//             draft.ticketType = action.payload;
//             break;
//         default:
//             return "s"
//     }
// }

interface IFrom extends Partial<IAirport> {
    from: string;
    selectedAirport: string;
}

interface ITo extends Partial<IAirport> {
    to: string;
    selectedAirport: string;
}

const Flight = () => {

    // const [{ticketType}, dispatch] = useImmerReducer(flightReducer, initialState);

    const [ticketType, setTicketType] = useState("round-trip");
    const [from, setFrom] = useState<string>("");
    const [fromResults, setFromResults] = useState<IAirport[]>([]);
    const [fromSelectedAirport, setFromSelectedAirport] = useState<IAirport | null>(null);
    const [to, setTo] = useState<string>("");
    const [toResults, setToResults] = useState<IAirport[]>([]);
    const [toSelectedAirport, setToSelectedAirport] = useState<IAirport | null>(null);
    const [flightClass, setFlightClass] = useState<FlightClassType>('Economy');
    const [passengers, setPassengers] = useState<IPassengers>({
        adult: 1,
        child: 0,
        infant: 0,
        student: 0
    });
    const [date, setDate] = useState<any>();

    const {token, getCredential} = useAuth();

    const getAirportDetail = async (action: DIRECTION) => {
        const controller = new AbortController();
        if (from.length >= 3 || to.length >= 3) {
            try {
                const {data} = await searchAirportsService(action === "FROM" ? from : to, controller.signal);
                if (action === "FROM") setFromResults(data);
                if (action === "TO") setToResults(data);
                controller.abort();
            } catch (e) {
                return e;
            }
        } else {
            setFromResults([]);
            setToResults([]);
        }
    };

    const getAirportDetailDebouncer = debounce((action: DIRECTION) => getAirportDetail(action), 300);

    const operator = (operate: "+" | "-", name: PassengersType) => {
        setPassengers({...passengers, [name]: operate === "-" ? passengers[name] - 1 : passengers[name] + 1})
    }

    const handleChangePorts = () => {
        setFrom(to);
        setTo(from);
        setFromResults(toResults);
        setToResults(fromResults);
        setFromSelectedAirport(toSelectedAirport);
        setToSelectedAirport(fromSelectedAirport);
    }

    const onSubmit = async () => {
        const payload = {
            TwoWay: ticketType === "round-trip",
            Adult: passengers.adult,
            Child: passengers.child,
            Infant: passengers.infant,
            FlightClass: flightClass.at(0)?.toLowerCase(),
            Segments: [
                {
                    Source: fromSelectedAirport?.city_code,
                    Destination: toSelectedAirport?.city_code,
                    Date: dayjs(date[0]).format(dateFormat),
                    ReturnDate: dayjs(date[1]).format(dateFormat)
                }
            ]

        }
        try {
            const {data} = await searchTicketService(payload);
            console.log(data);
        } catch (e) {
            return e;
        }
    }

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
    }

    useEffect(() => {
        // console.log(fromSelectedAirport)
        // console.log(toSelectedAirport)
        if (!token) {
            const controller = new AbortController();
            getCredential(controller.signal);

            return () => {
                controller.abort("Request canceled by user.");
            }
        }
    }, [token, fromSelectedAirport, toSelectedAirport]);

    return (
        <Form onFinish={onSubmit}>
            <div className="mb-3 ml-1">
                <TicketType ticketType={ticketType} setTicketType={setTicketType}/>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                <div className="w-full flex flex-1 justify-center relative">
                    <FromAirport from={from} setFrom={setFrom} fromResults={fromResults}
                                 getAirportDetailDebouncer={getAirportDetailDebouncer}
                                 handleSelectedAirport={handleSelectedAirport}/>
                    <MdOutlineChangeCircle
                        onClick={handleChangePorts}
                        className="absolute top-2 w-6 h-6 z-10 self-center fill-cyan-700 cursor-pointer"/>
                    <ToAirport to={to} setTo={setTo} toResults={toResults}
                               getAirportDetailDebouncer={getAirportDetailDebouncer}
                               handleSelectedAirport={handleSelectedAirport}/>
                </div>
                <div className="text-center w-full flex-1">
                    <RangePicker
                        size="large"
                        className="min-w-[250px]"
                        placeholder={["Departure", "Return"]}
                        disabledDate={disabledDate}
                        format={dateFormat}
                        value={date}
                        onChange={setDate}
                    />
                </div>
                <div className="relative text-center flex-[0.5]">
                    <Passengers passengers={passengers} flightClass={flightClass} setFlightClass={setFlightClass}
                                operator={operator} passengersTypeList={PASSENGERS_TYPE_LIST}/>
                </div>
            </div>
            <div className="text-center mx-auto lg:ml-auto mt-4">
                <Button htmlType="submit" type="primary" size="large" className="bg-cyan-700">Search Flights</Button>
            </div>
        </Form>
    );
};

export default Flight;
