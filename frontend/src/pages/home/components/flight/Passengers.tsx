import React, {FC, forwardRef, LegacyRef, Ref} from 'react';
import {motion} from "framer-motion";
import {Button, Segmented} from "antd";
import {OperatorBtn} from "../../../../components";
import {
    FlightClassType,
    IPassengers,
    IPassengersTypeList,
    OperatorType,
    PassengersType
} from "../../../../types/Flight.type";
import withClickOutside, {IWithClickOutsideProps} from "../../../../hoc/WithClickOutside";

interface IPassengersProps extends IWithClickOutsideProps {
    flightClass: FlightClassType;
    setFlightClass: (flightClass: any) => void;
    passengersTypeList: ReadonlyArray<IPassengersTypeList>;
    operator: (operator: OperatorType, name: PassengersType) => void;
    passengers: IPassengers;
}

const Passengers: FC<IPassengersProps> = forwardRef(({flightClass, setFlightClass, passengers, operator, passengersTypeList, open, setOpen}, ref: Ref<HTMLDivElement>) => {
    return (
        <>
            <Button
                className="bg-white w-full max-w-[150px]" size="large"
                onClick={() => setOpen(!open)}>Passengers</Button>
            {open && (
                <motion.div
                    className="absolute top-10 right-0 left-0 w-fit mx-auto rounded-md p-2 space-y-3 z-10 bg-white"
                    variants={{
                        visible: {opacity: 1}, hidden: {opacity: 0}
                    }} initial="hidden" animate="visible" transition={{ease: "easeOut", delay: 0.3}} ref={ref}>
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
                </motion.div>
            )}
        </>
    );
});

export default withClickOutside(Passengers);
