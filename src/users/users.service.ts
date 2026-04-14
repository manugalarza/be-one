// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-C  ·  Implement UsersService
// ─────────────────────────────────────────────────────────────────────────────
// Create an in-memory service following the same pattern as ProductsService.
//
// Requirements:
//   - Store users in a private array
//   - Pre-populate with at least 2 seed users
//   - Implement: findAll, findOne(id), create(dto), update(id, dto), remove(id)
//   - findOne must throw NotFoundException when user is not found
//
// Interface to use:
//   export interface User {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//     role: string;
//   }

// Implement the service with in-memory storage. Methods needed:

// findAll() → User[]
// findOne(id: number) → User (throw NotFoundException if missing)
// create(dto: CreateUserDto) → User
// update(id: number, dto: UpdateUserDto) → User
// remove(id: number) → User
// Pre-populate the array with two seed users
// ─────────────────────────────────────────────────────────────────────────────

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

@Injectable()
export class UsersService {
  // In-memory "database" – a plain array
  private users: User[] = [
    { id: 1, name: 'Manuela', email: 'manuela@gmail.com', age: 20, role: 'student' },
    { id: 2, name: 'Tomas', email: 'tomas@gmail.com', age: 22, role: 'student' },
  ];
  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(dto: CreateUserDto): User {
    if (this.users.find(u => u.email === dto.email)) {
      throw new ConflictException('Email already registered');
    }
    const user: User = {
      id: this.nextId++,
      name: dto.name,
      email: dto.email,
      age: dto.age,
      role: dto.role ?? 'student',
    };
    this.users.push(user);
    return user;
  }

  /**
   * Search user by email. Returns user or throws NotFoundException.
   */
  findByEmail(email: string): User {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  update(id: number, dto: UpdateUserDto): User {
    const user = this.findOne(id); // throws if not found
    Object.assign(user, dto);
    return user;
  }

  remove(id: number): User {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
    return user;
  }
}
  
