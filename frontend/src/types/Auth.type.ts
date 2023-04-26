export interface IResponse<T> {
    data: T
}

export interface IAuth {
    Success: boolean;
    ID: number;
    Message: string;
    Value: {
        Token: string;
        Expirity: string;
    };
}
