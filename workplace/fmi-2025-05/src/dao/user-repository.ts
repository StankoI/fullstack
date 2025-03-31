import { Repositiry, RepositiryInMemory } from "./repository.js";
import { User } from "../model/user.js";
import { Optional } from "../common/common-types.js";

export interface UserRepository extends Repositiry<User>{
    findByEmail(email: string): Optional<User>
}

export class UserRepositoryInMemory extends RepositiryInMemory<User> implements UserRepository{
    findByEmail(email: string): Optional<User> {
        // console.log("1");
        // console.log(this.findAll().find(user => user.email === email));
        return this.findAll().find(user => user.email === email)
    }
    
}