import React, {useEffect} from 'react';
import {CheckIn, FlightSearch, FlightStatus} from "./components";
import {Tabs, TabsProps} from "antd";
import {useAuth} from "../../hooks";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Flight`,
        children: <FlightSearch/>,
    },
    {
        key: '2',
        label: `Check-in / Manage Booking`,
        children: <CheckIn/>,
    },
    {
        key: '3',
        label: `Flight Status`,
        children: <FlightStatus/>,
    },
];

const Home = () => {
    const {token, getCredential} = useAuth();

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
        <div className="w-full lg:w-3/4 xl:w-3/5 mx-auto">
            <Tabs defaultActiveKey="1" type="card" items={items} />
        </div>
    );
};

export default Home;
