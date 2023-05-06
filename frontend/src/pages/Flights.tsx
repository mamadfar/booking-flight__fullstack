import {useEffect} from 'react';
import {useFlights} from "../hooks/useFlights";
import {useNavigate} from "react-router-dom";
import {Button, Collapse, Row} from "antd";
import {IoIosAirplane, IoIosPricetag} from "react-icons/io";
import {MdAirlineSeatReclineExtra} from "react-icons/md";
import {Helmet} from "react-helmet-async";

const {Panel} = Collapse;

const Flights = () => {

    const navigate = useNavigate();
    const {flights} = useFlights();

    useEffect(() => {
        if (flights.length === 0) navigate("/", {replace: true});
    }, [flights])

    return (
        <>
            <Helmet>
                <title>Flights List</title>
            </Helmet>
            <Row className="flex-col w-full lg:w-3/4 xl:w-3/5 mx-auto">
                {flights.map((flight, index) => (
                    <div key={index}>
                        <Row
                            className="flex-col sm:flex-row items-center border rounded-t-md px-2 py-1 bg-white">
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
                                        <div
                                            className="self-center w-full h-[2px] border-t border-dashed border-gray-800"/>
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
                        <Collapse className="bg-gray-100 flex justify-center rounded-t-none" expandIconPosition="end"
                                  ghost>
                            <Panel className="w-full flex flex-col h-fit items-center border-0" header="Flight Details"
                                   key="1">
                                {flight.Details.map((flightDetail, index) => (
                                    <div key={index} className="mb-5">
                                        <Row className="justify-between items-center border-b border-dashed mb-2">
                                            <Row className="items-center">
                                                <img className="w-10 h-10 mr-1"
                                                     src={`https://test.bilifo.com${flightDetail.Logo}`}
                                                     alt={flightDetail.ProviderName}/>
                                                <small>{flightDetail.ProviderName}</small>
                                            </Row>
                                            <small>{flightDetail.Duration}</small>
                                        </Row>
                                        <Row className="flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between">
                                            <Row className="flex-col flex-1 leading-6">
                                                <p><small className="font-bold">Flight
                                                    No:</small> {flightDetail.FlightNumber}</p>
                                                <p><small
                                                    className="font-bold">Aircraft:</small> {flightDetail.Aircraft}
                                                </p>
                                                <p><small
                                                    className="font-bold">Class:</small> {flightDetail.FlightClass}
                                                </p>
                                                <p><small className="font-bold">Baggage:</small> {flightDetail.Baggage}
                                                </p>
                                            </Row>
                                            <Row className="flex-col flex-1 leading-6">
                                                <p>{flightDetail.SourceCity} ({flightDetail.Source})</p>
                                                <p>{flightDetail.DepartureTime}</p>
                                                <p>{flightDetail.DepartureDate}</p>
                                            </Row>
                                            <Row className="flex-col flex-1 leading-6">
                                                <p>{flightDetail.DestinationCity} ({flightDetail.Destination})</p>
                                                <p>{flightDetail.ArrivalTime}</p>
                                                <p>{flightDetail.ArrivalDate}</p>
                                            </Row>
                                        </Row>
                                    </div>
                                ))}
                            </Panel>
                        </Collapse>
                    </div>
                ))}
            </Row>
        </>
    );
};

export default Flights;
