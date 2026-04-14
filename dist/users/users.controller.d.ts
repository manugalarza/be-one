import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import("./users.service").User[];
    searchByEmail(email: string): import("./users.service").User;
    findOne(id: number): import("./users.service").User;
    create(createUserDto: CreateUserDto): import("./users.service").User;
    update(id: number, updateUserDto: UpdateUserDto): import("./users.service").User;
    remove(id: number): import("./users.service").User;
}
