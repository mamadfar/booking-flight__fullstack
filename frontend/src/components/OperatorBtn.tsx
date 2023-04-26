import React, {FC} from 'react';
import {Button} from "antd";
import {OperatorType} from "../types/Flight.type";

interface IOperatorBtn {
    disabled?: boolean;
    onClick: () => void;
    operator: OperatorType;
}

const OperatorBtn:FC<IOperatorBtn> = ({disabled, onClick, operator}) => {
    return (
        <Button disabled={disabled} onClick={onClick} type={operator === "+" ? "primary" : "default"} className={operator === "+" ? "bg-sky-500" : "border-sky-500"} shape="circle">
            {operator}
        </Button>
    );
};

export default OperatorBtn;
