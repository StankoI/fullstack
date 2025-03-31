export class UserServiceImpl {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    login(credentials, pass) {
        let email, password;
        if (typeof credentials === 'string') {
            email = credentials;
            password = pass ? pass : '';
        }
        else {
            email = credentials.email;
            password = credentials.password;
        }
        // console.log(email);
        // console.log(password);
        const user = this.userRepo.findByEmail(email);
        if (user) {
            if (user.password === password) {
                return user;
            }
            throw new Error('Invalid user password');
        }
        throw new Error(`User with email '${email}' does not exist.`);
    }
    // login(email: string, pass: string): User;
    // login(credentials: Credential): User;
    // login(email: unknown, pass?: unknown): User {
    //     throw new Error("Method not implemented.");
    // }
    addUser(userDto) {
        return this.userRepo.create(userDto);
    }
    getAllUsers() {
        return this.userRepo.findAll();
    }
    getUserById(id) {
        const user = this.userRepo.findById(id);
        if (user) {
            return user;
        }
        throw new Error(`User with ID = ${id} does not exist.`);
    }
    updateUser(user) {
        const updated = this.userRepo.update(user);
        if (updated) {
            return updated;
        }
        throw new Error(`User with Id = ${user.id} does not exist.`);
    }
    deleteUserById(id) {
        const deleted = this.userRepo.deleteById(id);
        if (deleted) {
            return deleted;
        }
        throw new Error(" new ");
    }
    getCount() {
        return this.userRepo.count();
    }
}
