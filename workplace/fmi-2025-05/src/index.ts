import { UserRepository, UserRepositoryInMemory } from "./dao/user-repository.js";
import { greet } from "./greeter.js";
import { Admin, Reader } from "./model/user.js";
import { UserService, UserServiceImpl } from "./service/user-service.js";
import { NumberIdGenerator } from "./util/idgen.js";

const resultDiv = document.getElementById("result");
resultDiv!.innerHTML = greet("Sergey Donkoglo")

const users = [
    new Admin('Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123'),
    new Reader('Hristo', 'Iliev', 'hril@abv.bg', '123456789', {country:"BG"})
]

const userRepo: UserRepository = new UserRepositoryInMemory(new NumberIdGenerator());
users.forEach(user => userRepo.create(user));


resultDiv!.innerHTML = '<ul>' + userRepo
            .findAll().map(user => `<li>${user.toString()}</li>`)
            .reduce((acc, val) => acc + val, '') + '</ul>';



const userService: UserService = new UserServiceImpl(userRepo);
const loggedUser = userService.login({email: 'trayan@gmail.com', password:'trayan123'});

console.log('Logged user:', loggedUser);
