import React, {useEffect, useState} from 'react';
import {Search} from "../../../components";
import {Button, DatePicker, Form, Input, Segmented, Select} from "antd";
import {motion} from "framer-motion";
import {authService} from "../../../services/auth.service";
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import {MdOutlineChangeCircle} from "react-icons/md";
import {getCookie, setCookie} from "typescript-cookie";
import useAuth from "../../../hooks/useAuth";
import {searchAirportsService} from "../../../services/flight.service";
import {ISearchAirport} from "../../../types/Flight.type";
import About from "../../About";
import {useDebounce} from "../../../hooks/useDebounce";
import {debounce} from "lodash";

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today
    return current && current < dayjs(new Date().setDate(new Date().getDate() - 1));
};

const Flight = () => {

    const [flightClass, setFlightClass] = useState<string | number>('Economy');
    const [passengerSectionVisible, setPassengerSectionVisible] = useState(false);
    // const [to, setTo] = useState<{ query: string, value: ISearchAirport | {} }>({
    //     query: "",
    //     value: {}
    // });
    const [fromResults, setFromResults] = useState<ReadonlyArray<ISearchAirport> | null>([]);
    const [from, setFrom] = useState("");
    const [toResults, setToResults] = useState<ReadonlyArray<ISearchAirport> | null>([]);
    const [to, setTo] = useState("");

    const {token, getCredential} = useAuth();

    // let timeoutId: ReturnType<typeof setTimeout> | null;
    const getAirportDetail = async (action: "FROM" | "TO") => {
        const controller = new AbortController();
        if (from.length >= 3 || to.length >= 3) {
            try {
                // const {data} = await searchAirportsService(from, controller.signal);
                // setResults(data)
                const {data} = await searchAirportsService(action === "FROM" ? from : to, controller.signal);
                if (action === "FROM") setFromResults(data);
                if (action === "TO") setToResults(data);
                controller.abort();
            } catch (e) {
                return e;
            }
        }
    };

    const getAirportDetailDebouncer = debounce((action: "FROM" | "TO") => getAirportDetail(action), 300);

    useEffect(() => {
        if (!token) {
            const controller = new AbortController();
            getCredential(controller.signal);

            return () => {
                controller.abort("Request canceled by user.");
            }
        }
    }, [token]);
    return (
        <Form>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0">
                <div className="w-full flex flex-1 justify-center relative">
                    <Input size="large" className="w-full max-w-[200px] mr-1" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)}
                           onKeyUp={() => getAirportDetailDebouncer("FROM")}/>
                    {/*<Select*/}
                    {/*    showSearch*/}
                    {/*    // value={value}*/}
                    {/*    // defaultActiveFirstOption={false}*/}
                    {/*    labelInValue*/}
                    {/*    showArrow={false}*/}
                    {/*    filterOption={false}*/}
                    {/*    onSearch={(searchValue) => getAirportDetail(searchValue, "FROM")}*/}
                    {/*    // notFoundContent={fetching ? <Spin size="small" /> : null}*/}
                    {/*    onChange={setValue}*/}
                    {/*    placeholder="From"*/}
                    {/*    className="w-full max-w-[200px] mr-1"*/}
                    {/*    size="large"*/}
                    {/*    options={[{ value: 'lucy', label: <About/> }]}*/}
                    {/*/>*/}
                    {/*<h1>{fromResults?.length && fromResults[0]?.city_code}</h1>*/}
                    <MdOutlineChangeCircle
                        className="absolute top-2 w-6 h-6 z-10 self-center fill-cyan-700 cursor-pointer"/>
                    <Input size="large" className="w-full max-w-[200px] ml-1" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)}
                           onKeyUp={() => getAirportDetailDebouncer("TO")}/>
                    {/*<Select*/}
                    {/*    showSearch*/}
                    {/*    value={to}*/}
                    {/*    defaultActiveFirstOption={false}*/}
                    {/*    showArrow={false}*/}
                    {/*    filterOption={false}*/}
                    {/*    onSearch={handleSearch}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    notFoundContent={null}*/}
                    {/*    placeholder="To"*/}
                    {/*    className="w-full max-w-[200px] ml-1"*/}
                    {/*    size="large"/>*/}
                </div>
                <div className="text-center w-full flex-1">
                    <RangePicker
                        size="large"
                        // defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
                        className="min-w-[250px]"
                        placeholder={["Departure", "Return"]}
                        disabledDate={disabledDate}
                        format={dateFormat}
                    />
                </div>
                <div className="relative text-center flex-[0.5]">
                    <Button className="bg-white" size="large"
                            onClick={() => setPassengerSectionVisible(!passengerSectionVisible)}>Passengers</Button>
                    {passengerSectionVisible && (
                        <motion.div
                            className="absolute top-10 right-0 left-0 w-fit mx-auto rounded-md p-2 space-y-3 z-10 bg-white"
                            variants={{
                                visible: {opacity: 1}, hidden: {opacity: 0}
                            }} initial="hidden" animate="visible" transition={{ease: "easeOut", delay: 0.3}}>
                            <div>
                                <Segmented options={['Economy', 'Business', 'First']} value={flightClass}
                                           onChange={setFlightClass}/>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Adult</p>
                                <div>
                                    <Button className="border-sky-500" shape="circle">
                                        -
                                    </Button>
                                    <span className="mx-2">{1}</span>
                                    <Button type="primary" className="bg-sky-500" shape="circle">
                                        +
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Child</p>
                                <div>
                                    <Button className="border-sky-500" shape="circle">
                                        -
                                    </Button>
                                    <span className="mx-2">{1}</span>
                                    <Button type="primary" className="bg-sky-500" shape="circle">
                                        +
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Infant</p>
                                <div>
                                    <Button className="border-sky-500" shape="circle">
                                        -
                                    </Button>
                                    <span className="mx-2">{1}</span>
                                    <Button type="primary" className="bg-sky-500" shape="circle">
                                        +
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Student</p>
                                <div>
                                    <Button className="border-sky-500" shape="circle">
                                        -
                                    </Button>
                                    <span className="mx-2">{1}</span>
                                    <Button type="primary" className="bg-sky-500" shape="circle">
                                        +
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
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
