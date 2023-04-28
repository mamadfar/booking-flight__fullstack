import React, {useEffect, useState} from 'react';
import {Spin, Typography} from "antd";
import {fakeService} from "../services/fake.service";

const {Title} = Typography;

const About = () => {

    const [fake, setFake] = useState<any>({});

    const getFakeData = async (signal: AbortSignal) => {
        try {
            const {data} = await fakeService(Math.floor(Math.random()*10), signal);
            setFake(data);
        } catch (e) {
            return e;
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        getFakeData(controller.signal);
        return () => controller.abort();
    }, [])

    return (
        <div className="text-center">
            <Title level={2}>
                This is a small application from choosing an airport to select a ticket.
            </Title>
            <Title level={4}>Fake Data</Title>
            <div className="mt-1">
                {Object.keys(fake) ? (
                    <>
                        <Title level={5}>{fake.title}</Title>
                        <img className="w-24 h-auto mx-auto rounded-md object-contain" src={fake?.thumbnail}
                             alt="fake"/>
                    </>
                ) : <Spin spinning={true}/>}
            </div>
        </div>
    );
};

export default About;
