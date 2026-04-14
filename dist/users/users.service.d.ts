import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    role: string;
}
export declare class UsersService {
    private users;
    private nextId;
    findAll(): User[];
    findOne(id: number): User;
    create(dto: CreateUserDto): User;
    findByEmail(email: string): User;
    update(id: number, dto: UpdateUserDto): User;
    remove(id: number): User;
}
