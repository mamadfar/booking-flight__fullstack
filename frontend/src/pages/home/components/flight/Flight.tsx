import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form} from "antd";
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import useAuth from "../../../../hooks/useAuth";
import {searchAirportsService} from "../../../../services/flight.service";
import {
    DIRECTION,
    FlightClassType,
    IPassengers,
    IPassengersTypeList,
    ISearchAirport,
    PassengersType
} from "../../../../types/Flight.type";
import {debounce} from "lodash";
import TicketType from "./TicketType";
import AirPortSearch from "./AirPortSearch";
import Passengers from "./Passengers";

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';

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

const Flight = () => {

    const [ticketType, setTicketType] = useState("round-trip");
    const [from, setFrom] = useState("");
    const [fromResults, setFromResults] = useState<ReadonlyArray<ISearchAirport> | null>([]);
    const [to, setTo] = useState("");
    const [toResults, setToResults] = useState<ReadonlyArray<ISearchAirport> | null>([]);
    const [passengerSectionVisible, setPassengerSectionVisible] = useState(false);
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
        }
    };

    const getAirportDetailDebouncer = debounce((action: DIRECTION) => getAirportDetail(action), 300);

    const operator = (operate: "+" | "-", name: PassengersType) => {
        setPassengers({...passengers, [name]: operate === "-" ? passengers[name] - 1 : passengers[name] + 1})
    }

    useEffect(() => {
        console.log(dayjs(date).format(dateFormat))
        if (!token) {
            const controller = new AbortController();
            getCredential(controller.signal);

            return () => {
                controller.abort("Request canceled by user.");
            }
        }
    }, [token, date]);

    return (
        <Form>
            <div className="mb-3 ml-1">
                <TicketType ticketType={ticketType} setTicketType={setTicketType}/>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                <div className="w-full flex flex-1 justify-center relative">
                    <AirPortSearch from={from} setFrom={setFrom} to={to} setTo={setTo}
                                   getAirportDetailDebouncer={getAirportDetailDebouncer}/>
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
                    <Button className="bg-white" size="large"
                            onClick={() => setPassengerSectionVisible(!passengerSectionVisible)}>Passengers</Button>
                    {passengerSectionVisible && (
                        <Passengers passengers={passengers} flightClass={flightClass} setFlightClass={setFlightClass}
                                    operator={operator} passengersTypeList={PASSENGERS_TYPE_LIST} setPassengerSectionVisible={setPassengerSectionVisible}/>
                    )}
                </div>
            </div>
            <div className="text-center mx-auto lg:ml-auto mt-4">
                <Button type="primary" size="large" className="bg-cyan-700">Search Flights</Button>
            </div>
        </Form>
    );
};

export default Flight;
