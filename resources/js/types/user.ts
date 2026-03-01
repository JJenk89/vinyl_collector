export interface User {
    id: number;
    name: string;
    email: string;
}

export type AuthProp = {
    user: {
        name: string;
    } | null;
}