import { Identifialbe } from "../common/common-types.js";

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