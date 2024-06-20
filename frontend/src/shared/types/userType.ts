export type UserType = {
    id: number;
    name: string;
    email: string;
    token: string;
    roles: {id: number; name: string}
}