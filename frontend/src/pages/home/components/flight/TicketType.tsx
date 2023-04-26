import React, {FC} from 'react';
import {Radio} from "antd";

interface ITicketType {
    ticketType: string;
    setTicketType(ticketType: string) : void
}

const TicketType:FC<ITicketType> = ({ticketType, setTicketType}) => {
    return (
        <Radio.Group size="small" onChange={e => setTicketType(e.target.value)} value={ticketType}>
            <Radio value="round-trip">Round trip</Radio>
            <Radio value="one-way">One Way</Radio>
        </Radio.Group>
    );
};

export default TicketType;
