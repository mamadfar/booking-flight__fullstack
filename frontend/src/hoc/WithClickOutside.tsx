import React, {ComponentType, useEffect, useRef, useState} from "react";

export interface IWithClickOutsideProps{
    open?: boolean;
    setOpen?: any;
    ref?: any;
}

const withClickOutside = <T, >(WrappedComponent: ComponentType<T & IWithClickOutsideProps>) => {
    return (props: T) => {
        const [open, setOpen] = useState(false);

        const ref = useRef<HTMLElement | null>(null);

        useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            };
            const handleTabPressed = (event: any) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keyup", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keyup", handleClickOutside);
            }
        }, [ref]);

        return <WrappedComponent {...props} open={open} setOpen={setOpen} ref={ref}/>;
    };
}

export default withClickOutside;
