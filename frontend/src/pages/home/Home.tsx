import React from 'react';
import {CheckIn, Flight, FlightStatus} from "./components";
import {Button, Tabs, TabsProps} from "antd";

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Flight`,
        children: <Flight/>,
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

    return (
        // <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
        <div className="w-full md:w-3/4 xl:w-1/2 mx-auto">
            <Tabs defaultActiveKey="1" type="card" items={items} onChange={onChange} />
        </div>
    );
};

export default Home;
