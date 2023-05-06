import React, {FC, useMemo, useRef, useState} from 'react';
import {Select, Spin} from 'antd';
import type {SelectProps} from 'antd/es/select';
import debounce from 'lodash/debounce';
import {searchAirportsService} from "../../../../services/flight.service";

export interface IDebounceSelectProps<ValueType> extends SelectProps<ValueType | ValueType[]> {
    debounceTimeout?: number;
    optionValue: IOption | null;
    setOptionValue: (value: IOption | null) => void;
    placeholder: string;
}

// Usage of DebounceSelect
export interface IOption {
    label: Element;
    value: string;
    key: string | number;
    title?: string;
}

const DebounceSelect: FC<IDebounceSelectProps<any>> = ({
                                                           optionValue,
                                                           setOptionValue,
                                                           placeholder,
                                                           debounceTimeout = 800,
                                                           ...restProps
                                                       }) => {
    const [fetching, setFetching] = useState<boolean>(false);
    const [options, setOptions] = useState<IOption[]>([]);
    const fetchRef = useRef(0);

    const fetchAirportList = async (query: string): Promise<any[] | unknown> => {
        try {
            if (query.length >= 3) {
                const controller = new AbortController();
                const {data} = await searchAirportsService(query, controller.signal);
                return data.map((airport) => ({
                        label: (
                            <>
                                <h3>{airport.english_city}</h3>
                                <small className="whitespace-pre-wrap">{airport.english_airport}</small>
                            </>
                        ),
                        value: `${airport.city_code}-${airport.ID}`,
                        key: airport.ID,
                        title: airport.english_city
                    }),
                )
            } else {
                return []
            }
        } catch (e) {
            return e;
        }
    }

    const debounceFetcher = useMemo(() => {
        const loadOptions = async (value: string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            const newOptions = await fetchAirportList(value)
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions as IOption[]);
                setFetching(false);

        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchAirportList, debounceTimeout]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small"/> : null}
            options={options as any}
            showSearch
            value={optionValue}
            placeholder={placeholder}
            onChange={(newValue) => {
                setOptionValue(newValue as IOption);
            }}
            {...restProps}
        />
    );
}

export default DebounceSelect;
