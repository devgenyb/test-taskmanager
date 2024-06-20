export type ResponseErrorType = {
    status: number;
    data: ResponseMessageType | null;
}

export type ResponseMessageType = {
    message: string;
    errors?: object[]
}