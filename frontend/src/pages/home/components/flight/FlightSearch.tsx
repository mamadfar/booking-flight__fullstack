import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, notification, Spin} from "antd";
import {searchAirportsService, searchTicketService} from "../../../../services/flight.service";
import type {
    DIRECTION,
    FlightClassType,
    IPassengers,
    IPassengersTypeList,
    IAirport,
    PassengersType,
} from "../../../../types/Flight.type";
import {debounce} from "lodash";
import TicketType from "./TicketType";
import Passengers from "./Passengers";
import {MdOutlineChangeCircle} from "react-icons/md";
import FromAirport from "./FromAirport";
import ToAirport from "./ToAirport";
import {useAuth} from "../../../../hooks";
import {useFlights} from "../../../../hooks/useFlights";
import {useNavigate} from "react-router-dom";
import {dateFormat, dateFormatter, disabledDate} from "../../../../utils/date.util";

const {RangePicker} = DatePicker;

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

const FlightSearch = () => {

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
    const [loading, setLoading] = useState(false);

    const {token, getCredential} = useAuth();
    const {flights, flightsHandler} = useFlights();
    const [api, contextHolder] = notification.useNotification();
    const navigation = useNavigate()

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

    //? Handle sum or subtract of passengers count
    const operator = (operate: "+" | "-", name: PassengersType) => {
        setPassengers({...passengers, [name]: operate === "-" ? passengers[name] - 1 : passengers[name] + 1})
    }

    //? Handle switch ports
    const handleChangePorts = () => {
        setFrom(to);
        setTo(from);
        setFromResults(toResults);
        setToResults(fromResults);
        setFromSelectedAirport(toSelectedAirport);
        setToSelectedAirport(fromSelectedAirport);
    }

    //? Notification
    const openNotification = (message: string, description: string) => {
        api.info({
            message,
            description,
            placement: "bottom",
        });
    };

    //? Get the flights results and redirect to the fights page
    const onSubmit = async () => {
        setLoading(true);
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
                    Date: dateFormatter(date[0], dateFormat),
                    ReturnDate: dateFormatter(date[1], dateFormat)
                }
            ]

        };

        try {
            const {data, status} = await searchTicketService(payload);
            if (status === 200 && !data.Value.length) {
                openNotification("No Ticket!", `We are sorry, from ${fromSelectedAirport?.english_city} to ${toSelectedAirport?.english_city}, at ${dateFormatter(date[0], dateFormat)} we don't have any offer for you!`)
            } else if (status === 200 && data.Value.length) {
                flightsHandler(data.Value);
                navigation("/flights");
            } else {
                console.log(data);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            return e;
        }
    }

    //? Grab the whole data of each airport on click on each airport
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
        console.log(flights)
        if (!token) {
            const controller = new AbortController();
            getCredential(controller.signal);

            return () => {
                controller.abort("Request canceled by user.");
            }
        }
    }, [token, flights]);

    return (
        <Spin spinning={loading}>
            <Form onFinish={onSubmit}>
                {contextHolder}
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
                    <Button htmlType="submit" type="primary" size="large" className="bg-cyan-700">Search
                        Flights</Button>
                </div>
            </Form>
        </Spin>
    );
};

export default FlightSearch;
