export var Role;
(function (Role) {
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role[Role["READER"] = 2] = "READER";
    Role[Role["ADMIN"] = 3] = "ADMIN";
    Role[Role["ANONIMOUS"] = 4] = "ANONIMOUS";
})(Role || (Role = {}));
export class UserBase {
    constructor(
    // id: IdType,
    firstName, lastName, email, password, contact) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.id = 0;
        this.role = Role.READER;
    }
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in role [${this.role}]`;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, 
        Password: ${this.password}, Role: ${this.role}`;
    }
}
export class Reader extends UserBase {
    // id: IdType = undefined;
    constructor(firstName, lastName, email, password, contact) {
        super(password, firstName, lastName, email, contact);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.role = Role.READER;
    }
    toString() {
        return `READER: ${super.toString()}`;
    }
}
export class Admin extends UserBase {
    // id: IdType = undefined;
    constructor(firstName, lastName, email, password, contact) {
        super(password, firstName, lastName, email, contact);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.role = Role.ADMIN;
    }
    toString() {
        return `Admin: ${super.toString()}`;
    }
}
export class Author extends UserBase {
    // id: IdType = undefined;
    constructor(firstName, lastName, email, password, contact) {
        super(password, firstName, lastName, email, contact);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.role = Role.AUTHOR;
    }
    toString() {
        return `Author: ${super.toString()}`;
    }
}
