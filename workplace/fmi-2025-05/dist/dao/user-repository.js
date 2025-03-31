import { RepositiryInMemory } from "./repository.js";
export class UserRepositoryInMemory extends RepositiryInMemory {
    findByEmail(email) {
        // console.log("1");
        // console.log(this.findAll().find(user => user.email === email));
        return this.findAll().find(user => user.email === email);
    }
}
