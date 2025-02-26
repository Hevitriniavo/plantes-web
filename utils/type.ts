
export const ENDPOINT = 'https://plantes-api-production.up.railway.app';

export type Plante = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    addedDate: string;
    isActive: boolean;
    imageUrl: string;
};

export type AccessToken = {
    accessToken: string
}

export type User = {
    id: number;
    email: string;
    password: string;
    displayName: string;
    roles: ("USER" | "ADMIN")[];
    createdAt: string;
    updatedAt: string;
    lastLogin: string | null
}

export type Me = {
    sub: number;
    displayName: string;
    roles: ("USER" | "ADMIN")[];
    iat: number;
    exp: number;
}

export type API = {
    "/plantes": Plante[];
    "/plantes/[id]": Plante;
    "/auth/register": User;
    "/auth/login": AccessToken;
     "/auth/profile": Me
};
