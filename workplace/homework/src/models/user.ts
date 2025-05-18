import type { AccountStatus, Gender, IdType, Role } from "../types/commonType";

const DEFAULT_AVATARS: Record<Gender, string> = {
    male: "https://example.com/avatars/default-male.png",
    female: "https://example.com/avatars/default-female.png",
};

function isValidUsername(username: string): boolean {
    return /^\w{1,15}$/.test(username);
}

function isValidPassword(password: string): boolean {
    return /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
}

function validateId(id: string): boolean {
    return id.length <= 24;
}

export class User {
    id: IdType;
    name: string;
    username: string;
    password: string;
    gender: Gender;
    role: Role;
    photo: string;
    bio: string;
    status: AccountStatus;
    createdAt: Date;
    updatedAt: Date;

    static className = "User";

    constructor(params: { id: IdType; name: string; username: string; password: string;
                gender: Gender; role: Role; photo?: string; bio?: string; status?: AccountStatus;}) {
                    
        const { id, name, username, password, gender, role, photo, bio = "", status = "active",} = params;

        if (!validateId(id)) {
            throw new Error("ID must be at most 24 characters.");
        }

        if (!isValidUsername(username)) {
            throw new Error("Username must be up to 15 word characters.");
        }

        if (!isValidPassword(password)) {
            throw new Error("Password must be at least 8 characters with a digit and a special character.");
        }

        if (bio.length > 512) {
            throw new Error("Bio must be up to 512 characters.");
        }

        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.role = role;
        this.photo = photo || DEFAULT_AVATARS[gender];
        this.bio = bio;
        this.status = status;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    updateModified() {
        this.updatedAt = new Date();
    }
}

