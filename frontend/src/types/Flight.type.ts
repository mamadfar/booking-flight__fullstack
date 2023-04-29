
export interface IAirport {
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

export interface IFlight {
    API: string;
    AdultPrice: string;
    Aircraft: string;
    ArrivalDate: string;
    ArrivalTerminal: string;
    ArrivalTime: string;
    Baggage: string;
    Baggage_Details: {
        title: string;
        value: string;
    }[] | null;
    BookId: string;
    CabinType: string;
    ChildPrice: string;
    Currency: string;
    DepartureDate: string;
    DepartureTerminal: string;
    DepartureTime: string;
    Destination: string;
    DestinationCity: string;
    Details: IFlight[];
    Duration: string;
    FlightClass: string;
    FlightNumber: string;
    Index: string;
    InfantPrice: string;
    IsCharter: boolean;
    Logo: string;
    Price: string;
    ProviderId: string;
    ProviderName: string;
    Refundable: boolean;
    ResBookDesigCode: string | null;
    Rules: string;
    Seats: string;
    Source: string;
    SourceCity: string;
    Stops: number;
    SupplierName: string;
    Tax: string | null
    Tax_Details: {
        amount: number;
        code: string;
        currency: string;
        pax_type: string;
        title: string;
    }[] | null
}

export interface IPassengers {
    adult: number;
    child: number;
    infant: number;
    student: number;
}

export interface IPassengersTypeList {
    id: number,
    name: PassengersType,
    value: number
}

export type FlightClassType = 'Economy' | 'Business' | 'First';
export type BookerType = 'round-trip' | 'one-way';
export type OperatorType = "+" | "-";
export type PassengersType = "adult" | "child" | "infant" | "student";
export enum DIRECTION {
    FROM = "FROM",
    TO = "TO"
}
