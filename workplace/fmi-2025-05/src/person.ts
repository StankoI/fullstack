import { Identifialbe } from "./common-types";

export interface Person extends Identifialbe{
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}