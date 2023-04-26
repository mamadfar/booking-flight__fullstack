import React, {useState} from 'react';
import type {SelectProps} from "antd";
import {Input, Select} from "antd";

// let timeout: ReturnType<typeof setTimeout> | null;
let timeout: any;
let currentValue: string;

const fetch = (value: string, callback: Function) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    // const fake = () => {
    //     const str = qs.stringify({
    //         code: 'utf-8',
    //         q: value,
    //     });
    //     axios.get(`https://suggest.taobao.com/sug?${str}`)
    //         .then((response: any) => response.json())
    //         .then((d: any) => {
    //             if (currentValue === value) {
    //                 const {result} = d;
    //                 const data = result.map((item: any) => ({
    //                     value: item[0],
    //                     text: item[0],
    //                 }));
    //                 callback(data);
    //             }
    //         });
    // };

    timeout = setTimeout(()=> {}, 300);
};

const Search: React.FC<SelectProps> = ({...restProps}) => {

    const [data, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        if (newValue) {
            fetch(newValue, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Input/>
    );
};

export default Search;
