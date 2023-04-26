
export interface ISearchAirport {
    ID: number;
    gr: string;
    english_city: string;
    english_country: string;
    english_airport: string;
    order: number;
    status: number;
    code: string;
    russian_city: string;
    russian_country: string;
    russian_airport: string;
    turkish_city: string;
    turkish_country: string;
    turkish_airport: string;
    city_code: string;
    country_code: string;
}

export interface IPassengers {
    adult: number;
    child: number;
    infant: number;
    student: number;
};

export interface IPassengersTypeList {
    id: number,
    name: PassengersType,
    value: number
}

export type FlightClassType = 'Economy' | 'Business' | 'First';
export type OperatorType = "+" | "-";
export type PassengersType = "adult" | "child" | "infant" | "student";
export enum DIRECTION {
    FROM = "FROM",
    TO = "TO"
}
