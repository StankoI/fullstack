import { IdType } from "../common/common-types";
import { Contact, Person } from "./person";

export interface User extends Person {

    role: Role;
    password: string;
    readonly salutation: string;
    toString(): string;
    // toString: () => string;
}

export enum Role {
    AUTHOR = 1, READER, ADMIN, ANONIMOUS
}

export class UserBase implements User {
    public id: IdType = 0; 
    role: Role = Role.READER
    constructor(
        // id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined){}

    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in role [${this.role}]`
    }

    toString(): string {
        return `ID: ${this.id}, Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, 
        Password: ${this.password}, Role: ${this.role}`;
    }
}

export type UserCreateDto = Omit<User, "id">;

export class Reader extends UserBase {
    role = Role.READER
    // id: IdType = undefined;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined){
            super(password,firstName,lastName,email,contact)
    }
    

    toString(){
        return `READER: ${super.toString()}`;
    }    
}

export class Admin extends UserBase {
    role = Role.ADMIN
    // id: IdType = undefined;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined){
            super(password,firstName,lastName,email,contact)
    }
    

    toString(){
        return `Admin: ${super.toString()}`;
    }    
}

export class Author extends UserBase {
    role = Role.AUTHOR
    // id: IdType = undefined;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined){
            super(password,firstName,lastName,email,contact)
    }
    

    toString(){
        return `Author: ${super.toString()}`;
    }    
}