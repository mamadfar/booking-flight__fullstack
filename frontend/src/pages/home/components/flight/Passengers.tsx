import React, {FC} from 'react';
import {motion} from "framer-motion";
import {Segmented} from "antd";
import {OperatorBtn} from "../../../../components";
import {
    FlightClassType,
    IPassengers,
    IPassengersTypeList,
    OperatorType,
    PassengersType
} from "../../../../types/Flight.type";

interface IPassengersProps {
    flightClass: FlightClassType;
    setFlightClass: (flightClass: any) => void;
    passengersTypeList: ReadonlyArray<IPassengersTypeList>;
    operator: (operator: OperatorType, name: PassengersType) => void;
    passengers: IPassengers;
    setPassengerSectionVisible: (passengerSectionVisible: boolean) => void;
}

const Passengers: FC<IPassengersProps> = ({flightClass, setFlightClass, passengers, operator, passengersTypeList, setPassengerSectionVisible}) => {
    return (
        <motion.div
            onMouseLeave={() => setPassengerSectionVisible(false)}
            className="absolute top-10 right-0 left-0 w-fit mx-auto rounded-md p-2 space-y-3 z-10 bg-white"
            variants={{
                visible: {opacity: 1}, hidden: {opacity: 0}
            }} initial="hidden" animate="visible" transition={{ease: "easeOut", delay: 0.3}}>
            <div>
                <Segmented options={['Economy', 'Business', 'First']} value={flightClass}
                           onChange={setFlightClass}/>
            </div>
            {passengersTypeList.map(passenger => (
                <div key={passenger.id} className="flex justify-between items-center">
                    <p>{passenger.name}</p>
                    <div>
                        <OperatorBtn disabled={passengers[passenger.name] <= passenger.value} onClick={() => operator("-", passenger.name)} operator="-"/>
                        <span className="mx-2">{passengers[passenger.name]}</span>
                        <OperatorBtn onClick={() => operator("+", passenger.name)} operator="+"/>
                    </div>
                </div>
            ))}
            {/*<div className="flex justify-between items-center">*/}
            {/*    <p>Adult</p>*/}
            {/*    <div>*/}
            {/*        <OperatorBtn disabled={passengers.adult <= 1} onClick={() => operator("-", "adult")} operator="-"/>*/}
            {/*        <span className="mx-2">{passengers.adult}</span>*/}
            {/*        <OperatorBtn onClick={() => operator("+", "adult")} operator="+"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="flex justify-between items-center">*/}
            {/*    <p>Child</p>*/}
            {/*    <div>*/}
            {/*        <Button className="border-sky-500" shape="circle">*/}
            {/*            -*/}
            {/*        </Button>*/}
            {/*        <span className="mx-2">{1}</span>*/}
            {/*        <Button type="primary" className="bg-sky-500" shape="circle">*/}
            {/*            +*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="flex justify-between items-center">*/}
            {/*    <p>Infant</p>*/}
            {/*    <div>*/}
            {/*        <Button className="border-sky-500" shape="circle">*/}
            {/*            -*/}
            {/*        </Button>*/}
            {/*        <span className="mx-2">{1}</span>*/}
            {/*        <Button type="primary" className="bg-sky-500" shape="circle">*/}
            {/*            +*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="flex justify-between items-center">*/}
            {/*    <p>Student</p>*/}
            {/*    <div>*/}
            {/*        <Button className="border-sky-500" shape="circle">*/}
            {/*            -*/}
            {/*        </Button>*/}
            {/*        <span className="mx-2">{1}</span>*/}
            {/*        <Button type="primary" className="bg-sky-500" shape="circle">*/}
            {/*            +*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </motion.div>
    );
};

export default Passengers;
