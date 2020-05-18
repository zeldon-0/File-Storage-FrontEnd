export class User {
    id: number;
    userName: string;
    email: string;
    roles : string[];
    token?: string;
    refreshToken?: string;
}