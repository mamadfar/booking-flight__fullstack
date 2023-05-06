import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, notification, Spin} from "antd";
import {searchTicketService} from "../../../../services/flight.service";
import {FlightClassType, IPassengers, IPassengersTypeList, PassengersType} from "../../../../types/Flight.type";
import TicketType from "./TicketType";
import Passengers from "./Passengers";
import {useFlights} from "../../../../hooks/useFlights";
import {useNavigate} from "react-router-dom";
import {dateFormat, dateFormatter, disabledDate} from "../../../../utils/date.util";
import DebounceSelect, {IOption} from "./DebouncerSelect";

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

    const [fromSelectedAirport, setFromSelectedAirport] = useState<IOption | null>(null);
    const [toSelectedAirport, setToSelectedAirport] = useState<IOption | null>(null);
    const [ticketType, setTicketType] = useState("round-trip");
    const [flightClass, setFlightClass] = useState<FlightClassType>('Economy');
    const [passengers, setPassengers] = useState<IPassengers>({
        adult: 1,
        child: 0,
        infant: 0,
        student: 0
    });
    const [dates, setDates] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const {flights, flightsHandler} = useFlights();

    const [api, contextHolder] = notification.useNotification();
    const navigation = useNavigate();

    //? Handle sum or subtract of passengers count
    const operator = (operate: "+" | "-", name: PassengersType) => {
        setPassengers({...passengers, [name]: operate === "-" ? passengers[name] - 1 : passengers[name] + 1})
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
                    Source: fromSelectedAirport?.value.split("-")[0],
                    Destination: toSelectedAirport?.value.split("-")[0],
                    Date: dateFormatter(dates[0], dateFormat),
                    ReturnDate: dateFormatter(dates[1], dateFormat)
                }
            ]

        };

        try {
            const {data, status} = await searchTicketService(payload);
            if (status === 200 && data.Value.length) {
                flightsHandler(data.Value);
            } else if (status === 200 && (!data.Value || data.Value.length === 0)) {
                openNotification("No Ticket!", `We are sorry, from ${fromSelectedAirport?.title} to ${toSelectedAirport?.title}, at ${dateFormatter(dates[0], dateFormat)} we don't have any offer for you!`)
            } else {
                console.log(data);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            return e;
        }
    }

    useEffect(() => {
        if (flights.length) navigation("/flights");
    }, [flights])


    return (
        <Spin spinning={loading}>
            <Form onFinish={onSubmit} className="bg-white/30 py-3 px-1">
                {contextHolder}
                <div className="mb-3 ml-1">
                    <TicketType ticketType={ticketType} setTicketType={setTicketType}/>
                </div>
                <div>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                    <div className="flex flex-1 justify-center relative space-x-2">
                        <div className="flex-1 shrink">
                            <DebounceSelect
                                className="w-full min-w-full max-w-[150px]"
                                size="large" optionValue={fromSelectedAirport}
                                setOptionValue={setFromSelectedAirport} placeholder="From"/>
                        </div>
                        <div className="flex-1 shrink">
                            <DebounceSelect
                                className="w-full min-w-full max-w-[150px]"
                                size="large" optionValue={toSelectedAirport}
                                setOptionValue={setToSelectedAirport} placeholder="To"/>
                        </div>
                    </div>
                    <div className="text-center w-full flex-1">
                        <RangePicker
                            size="large"
                            className="md:w-full min-w-[250px]"
                            placeholder={["Departure", "Return"]}
                            disabledDate={disabledDate}
                            format={dateFormat}
                            value={dates}
                            defaultValue={null}
                            allowEmpty={[false, false]}
                            onChange={setDates}
                        />
                    </div>
                    <div className="relative text-center flex-[0.5]">
                        <Passengers passengers={passengers} flightClass={flightClass} setFlightClass={setFlightClass}
                                    operator={operator} passengersTypeList={PASSENGERS_TYPE_LIST}/>
                    </div>
                </div>
                <div className="text-center mx-auto lg:ml-auto mt-4">
                    <Button disabled={dates.length === 0 || typeof fromSelectedAirport?.value === "undefined"}
                            htmlType="submit" type="primary" size="large" className="bg-cyan-700">Search
                        Flights</Button>
                </div>
            </Form>
        </Spin>
    );
};

export default FlightSearch;
