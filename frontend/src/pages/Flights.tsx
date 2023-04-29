import React, {useEffect} from 'react';
import {useFlights} from "../hooks/useFlights";
import {useNavigate} from "react-router-dom";
import {IFlight} from "../types/Flight.type";
import {Button, Collapse, Row} from "antd";
import {IoIosAirplane, IoIosPricetag} from "react-icons/io";
import {MdAirlineSeatReclineExtra} from "react-icons/md";

const {Panel} = Collapse;

const Flights = () => {

    const navigate = useNavigate();
    const {flights} = useFlights();

    useEffect(() => {
        // if (!tickets.length) navigate("/", {replace: true});
    }, [flights])

    const FAKE_DATA: IFlight[] = [
        {
            API: "avia",
            AdultPrice: "41,583.00",
            Aircraft: "-",
            ArrivalDate: "Saturday, 06/05/2023",
            ArrivalTerminal: "",
            ArrivalTime: "14:30 +1",
            Baggage: "1 Piece 10 KG (Cabin)",
            Baggage_Details: [{title: "Adult", value: "30 KG"}, {title: "Child", value: "30 KG"}, {
                title: "Infant",
                value: "10 KG"
            }],
            BookId: "246696",
            CabinType: "E",
            ChildPrice: "0.00",
            Currency: "RUB",
            DepartureDate: "Friday, 05/05/2023",
            DepartureTerminal: "",
            DepartureTime: "23:40",
            Destination: "DXB",
            DestinationCity: "Dubai",
            Details: [
                {
                    API: "avia",
                    AdultPrice: "",
                    Aircraft: "Boeing 737-800 with winglets",
                    ArrivalDate: "Saturday, 06/05/2023",
                    ArrivalTerminal: "C",
                    ArrivalTime: "04:40",
                    Baggage: "1 Piece 10 KG (Cabin)",
                    Baggage_Details: null,
                    BookId: "246696",
                    CabinType: "E",
                    ChildPrice: "",
                    Currency: "RUB",
                    DepartureDate: "Friday, 05/05/2023",
                    DepartureTerminal: "",
                    DepartureTime: "23:40",
                    Destination: "SVO",
                    DestinationCity: "Moscow",
                    Details: [],
                    Duration: "5H",
                    FlightClass: "E",
                    FlightNumber: "2135",
                    Index: "0",
                    InfantPrice: "",
                    IsCharter: false,
                    Logo: "/images/files/orange-all-logos/SU.png",
                    Price: "41,583.00",
                    ProviderId: "SU",
                    ProviderName: "Aeroflot",
                    Refundable: false,
                    ResBookDesigCode: null,
                    Rules: "",
                    Seats: "1",
                    Source: "IST",
                    SourceCity: "Istanbul",
                    Stops: 3,
                    SupplierName: "Aeroflot",
                    Tax: null,
                    Tax_Details: null
                }
            ],
            Duration: "13H & 50M",
            FlightClass: "E",
            FlightNumber: "2135",
            Index: "0",
            InfantPrice: "0.00",
            IsCharter: false,
            Logo: "/images/files/orange-all-logos/SU.png",
            Price: "41,583.00",
            ProviderId: "SU",
            ProviderName: "Aeroflot",
            Refundable: false,
            ResBookDesigCode: null,
            Rules: "1)REFUND FEE: UNUSED CANCELLED TKT RUB 8,000 , UNUSED NO-SHOW TKT RUB 10,000 INBOUND TKT OF NO-SHOW PASSENGERS WILL BE CANCELLED AUTOMATICALLY WITHOUT NOTIFICATION;  2)CHANGE DATE PERMITTED AT CHARGE OF RUB 6,000 PER SEGMENT IN CASE OF AVAILABILITY IN SAME RBD BASED ON IRANIAN AIRLINES EXCHANGE RATE OTHERWISE THE DIFFERENCE OF RBD FARES AND TAX SHALL BE PAID BASED ON IRANIAN AIRLINES EXCHANGE RATE;  3)CHANGE DATE OF NO-SHOW TKT PERMITTED AT CHARGE OF RUB 10,000 PER NO-SHOW SEGMENT IN CASE OF AVAILABILITY IN SAME RBD BASED ON IRANIAN AIRLINES EXCHANGE RATE OTHERWISE THE DIFFERENCE OF RBD FARES AND TAX SHALL BE PAID BASED ON IRANIAN AIRLINES EXCHANGE RATE;  4)CONFIRM OPEN RETURN WITHIN TKT VALIDITY IN SAME RBD IS PERMITTED FREE OF CHARGE OTHERWISE THE DIFFERENCE OF RBD FARES AND TAX SHALL BE PAID BASED ON IRANIAN AIRLINES EXCHANGE RATE;  5)FREE BAG: 30KG, HAND BAG: 5KG, INF: 10KG (MAXIMUM OF TWO PIECES OF LUGGAGE ARE ALLOWED TO BE CHECKED IN PER TICKETED PASSENGER);  6)MAX STAY: 3 MONTHS; 7)PARTIALLY USED TKT DEDUCT ONE WAY FARE INSTEAD OF HALF ROUND TRIP FARE ; 8)EXCESS BAGGAGE: VKO/SVO/LED-IKA: RUB 1150 , IKA-VKO/SVO/LED:IRR 2,000,000 (9% VAT INCLUDED:IRR170,000); 9)OPEN JAW PERMITTED TO ALL W5 POINTS PROVIDED THE ROUND TRIP FARES OF ORIGIN ARE COMBINED ON1/2 RT BASIS.",
            Seats: "1",
            Source: "IST",
            SourceCity: "Istanbul",
            Stops: 3,
            SupplierName: "Aeroflot",
            Tax: null,
            Tax_Details: [
                {
                    amount: 100,
                    code: "YQ",
                    currency: "RUB",
                    pax_type: "Adult",
                    title: "Red Cross Fee"
                },
                {
                    amount: 299.5,
                    code: "YQ",
                    currency: "RUB",
                    pax_type: "Child",
                    title: "Airport Service Charge"
                }
            ]
        }
    ]

    return (
        <Row className="flex-col w-full lg:w-3/4 xl:w-3/5 mx-auto">
            {FAKE_DATA.map((flight, index) => (
                <>
                    <Row key={index} className="flex-col sm:flex-row items-center border rounded-t-md px-2 py-1 bg-white">
                        <div className="text-center flex-[0.75]">
                            <img className="mx-auto" src={`https://test.bilifo.com${flight.Logo}`}
                                 alt={flight.ProviderName}/>
                            <small>{flight.ProviderName}</small>
                        </div>
                        <Row className="items-center w-full flex-[3] xl:flex-[4]">
                            <div className="text-center flex-1 md:flex-[2]">
                                <time className=" text-2xl">{flight.DepartureTime}</time>
                                <p className="text-gray-600 text-xl">{flight.SourceCity}</p>
                                <p className="text-gray-600 text-md">Airport ({flight.Source})</p>
                            </div>
                            <div className="flex-[2] hidden md:block">
                                <Row className="justify-between">
                                    <small>{flight.ArrivalDate}</small>
                                    <small>{flight.Duration}</small>
                                </Row>
                                <Row className="flex-nowrap">
                                    <IoIosAirplane className="w-6 h-6"/>
                                    <div className="self-center w-full h-[2px] border-t border-dashed border-gray-800"/>
                                </Row>
                            </div>
                            <div className="text-center flex-1 md:flex-[2]">
                                <time className=" text-2xl">{flight.ArrivalTime}</time>
                                <p className="text-gray-600 text-xl">{flight.DestinationCity}</p>
                                <p className="text-gray-600 text-md">Airport ({flight.Destination})</p>
                            </div>
                        </Row>
                        <div className="text-center flex-1">
                            <div className="relative">
                                <span className="inline-block"><IoIosPricetag/></span>
                                <span className="text-cyan-700 text-xl">{flight.Price.split(".")[0]}</span><small
                                className="ml-2">{flight.Currency}</small>
                            </div>
                            <div className="">
                                <small className="text-gray-600">ADULT: {flight.AdultPrice.split(".")[0]}</small>
                            </div>
                            <div className="my-2">
                                <Button type="primary" className="bg-cyan-700 px-8 sm:px-5">Select</Button>
                            </div>
                            <Row className="text-center items-center justify-center">
                                <MdAirlineSeatReclineExtra className="w-5 h-5"/>
                                <span>{flight.Seats}</span>
                            </Row>
                        </div>
                    </Row>
                        <Collapse className="bg-gray-100 flex justify-center rounded-t-none" expandIconPosition="end" defaultActiveKey={['1']} ghost>
                            <Panel header="Flight Details" key="1">
                                <p>mamad</p>
                            </Panel>
                        </Collapse>
                </>
            ))}
        </Row>
    );
};

export default Flights;
