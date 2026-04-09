# NestJS Workshop – Routing & Input Validation

> **Goal:** understand how NestJS organises code into Modules → Controllers → Services, how routes map to HTTP verbs, and how to validate incoming data automatically with class-validator.

---

## Table of Contents

1. [Setup](#1-setup)
2. [Project Overview](#2-project-overview)
3. [Core Concepts Review](#3-core-concepts-review)
4. [Activity 1 – Read the Products Module (full example)](#4-activity-1--read-the-products-module)
5. [Activity 2 – Complete the Tasks Module](#5-activity-2--complete-the-tasks-module)
6. [Activity 3 – Build the Users Module from scratch](#6-activity-3--build-the-users-module-from-scratch)
7. [Testing your API](#7-testing-your-api)
8. [Bonus Challenges](#8-bonus-challenges)
9. [Quick Reference](#9-quick-reference)

---

## 1. Setup

```bash
# Install dependencies
npm install

# Start the server in watch mode (auto-restarts on file changes)
npm run start:dev
```

The API will be available at `http://localhost:3000`.

---

## 2. Project Overview

```
src/
├── main.ts                  ← App entry point; GlobalPipe is configured here
├── app.module.ts            ← Root module; imports the three feature modules
│
├── products/                ★ FULL implementation  – read and understand this
│   ├── dto/
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
│
├── tasks/                   ✎ PARTIAL – service is done, you complete the rest
│   ├── dto/
│   │   ├── create-task.dto.ts   ← Activity 2-A: add validators
│   │   └── update-task.dto.ts   ← Activity 2-B: build from scratch
│   ├── tasks.controller.ts      ← Activity 2-C: add route decorators
│   ├── tasks.service.ts         ← already complete, read it
│   └── tasks.module.ts
│
└── users/                   ✏ BLANK – build everything following Products
    ├── dto/
    │   ├── create-user.dto.ts   ← Activity 3-A
    │   └── update-user.dto.ts   ← Activity 3-B
    ├── users.service.ts         ← Activity 3-C
    ├── users.controller.ts      ← Activity 3-D
    └── users.module.ts          ← Activity 3-E
```

---

## 3. Core Concepts Review

### 3.1 The Module/Controller/Service Triangle

```
┌─────────────────────────────────────────────────────┐
│  Module  – declares what belongs together           │
│  ┌──────────────────┐   ┌──────────────────────┐    │
│  │  Controller      │   │  Service             │    │
│  │  - handles HTTP  │──▶│  - business logic    │    │
│  │  - routing       │   │  - data access       │    │
│  │  - DTOs          │   │  - no HTTP concern   │    │
│  └──────────────────┘   └──────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

- **Module** (`@Module`) – groups controllers and services. Must be imported in `AppModule`.
- **Controller** (`@Controller`) – maps HTTP routes to methods. Uses `@Get`, `@Post`, etc.
- **Service** (`@Injectable`) – holds the actual logic. Injected into the controller via the constructor.

### 3.2 How a Request Flows

```
Client
  │
  ▼
NestJS HTTP layer
  │
  ▼  ValidationPipe runs here (global)
  │  – deserialises JSON body into the DTO class
  │  – validates all decorator constraints
  │  – throws 400 Bad Request if invalid
  ▼
Controller method
  │  – extracts @Param, @Body, etc.
  ▼
Service method
  │  – performs the operation
  ▼
Response sent back to client
```

### 3.3 Routing Decorators Cheat-Sheet

| Decorator | HTTP method | Example path |
|---|---|---|
| `@Get()` | GET | `/products` |
| `@Get(':id')` | GET | `/products/42` |
| `@Post()` | POST | `/products` |
| `@Patch(':id')` | PATCH | `/products/42` |
| `@Delete(':id')` | DELETE | `/products/42` |

### 3.4 Parameter Decorators

| Decorator | What it extracts |
|---|---|
| `@Body()` | Request body (validated against DTO) |
| `@Param('id')` | Route parameter as a string |
| `@Param('id', ParseIntPipe)` | Route parameter converted to `number` |

### 3.5 class-validator Decorators Used in this Project

| Decorator | Rule |
|---|---|
| `@IsString()` | Value must be a string |
| `@IsNotEmpty()` | Value must not be empty |
| `@IsNumber()` | Value must be a number |
| `@IsInt()` | Value must be an integer |
| `@IsPositive()` | Value must be > 0 |
| `@IsEmail()` | Value must be a valid email |
| `@IsEnum(MyEnum)` | Value must be one of the enum values |
| `@IsOptional()` | Skip validation if the field is absent |
| `@MinLength(n)` | String must have at least n characters |
| `@MaxLength(n)` | String must have at most n characters |
| `@Min(n)` | Number must be ≥ n |
| `@Max(n)` | Number must be ≤ n |

---

## 4. Activity 1 – Read the Products Module

**No coding required. Just read and understand.**

Open each file in this order and read the comments carefully:

1. `src/main.ts` – see how `ValidationPipe` is set globally.
2. `src/products/dto/create-product.dto.ts` – see how validators are applied to properties.
3. `src/products/products.service.ts` – see how the in-memory array is used as a "database".
4. `src/products/products.controller.ts` – see how routes map to service calls.
5. `src/products/products.module.ts` – see how everything is registered.

### Questions to answer before moving on

1. What happens if you send a POST to `/products` with `price: -5`? Why?
2. What is the role of `ParseIntPipe` in `@Param('id', ParseIntPipe)`?
3. What would happen without `@IsNotEmpty()` on `name`?
4. Why does the service throw `NotFoundException` instead of returning `null`?
5. What is the difference between `@Get()` and `@Get(':id')`?

---

## 5. Activity 2 – Complete the Tasks Module

The Tasks service is already implemented. You will complete the DTOs and the controller.

### Activity 2-A – Add validators to `CreateTaskDto`

File: `src/tasks/dto/create-task.dto.ts`

Requirements:
- `title`: required string, 3–100 characters
- `description`: optional string, max 300 characters
- `status`: optional; if provided, must be one of `'pending'`, `'in-progress'`, `'done'`

For `status`, use `@IsEnum()`:
```typescript
// Example of @IsEnum with a string union
const TaskStatus = ['pending', 'in-progress', 'done'] as const;
type TaskStatus = (typeof TaskStatus)[number];

@IsEnum(TaskStatus)
@IsOptional()
status?: TaskStatus;
```

### Activity 2-B – Build `UpdateTaskDto`

File: `src/tasks/dto/update-task.dto.ts`

Copy the fields from `CreateTaskDto`. Every field must be optional — add `@IsOptional()` to each.

### Activity 2-C – Complete the Tasks controller

File: `src/tasks/tasks.controller.ts`

The method bodies are already written. You need to:
1. Add the missing import for the HTTP/routing decorators.
2. Add the correct route decorator (`@Get()`, `@Post()`, etc.) above each method.
3. Add `@Body()` and `@Param()` decorators to the method parameters.

**Verify it works:**
```bash
# List tasks
curl http://localhost:3000/tasks

# Create a task (should succeed)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My new task", "status": "pending"}'

# Try creating with invalid data (should return 400)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "ab", "status": "flying"}'
```

---

## 6. Activity 3 – Build the Users Module from Scratch

Follow the Products module as a reference. Build each file in order.

### Activity 3-A – `src/users/dto/create-user.dto.ts`

Create the DTO for a new user:

| Field | Type | Rules |
|---|---|---|
| `name` | string | required, 2–50 chars |
| `email` | string | required, valid email |
| `age` | number | required, integer, 1–120 |
| `role` | string | optional, one of `'student'`, `'teacher'`, `'admin'` |

### Activity 3-B – `src/users/dto/update-user.dto.ts`

Same fields, all optional.

### Activity 3-C – `src/users/users.service.ts`

Implement the service with in-memory storage. Methods needed:
- `findAll()` → `User[]`
- `findOne(id: number)` → `User` (throw `NotFoundException` if missing)
- `create(dto: CreateUserDto)` → `User`
- `update(id: number, dto: UpdateUserDto)` → `User`
- `remove(id: number)` → `User`

Pre-populate the array with two seed users.

### Activity 3-D – `src/users/users.controller.ts`

Implement all 5 routes under `/users`. Follow the same pattern as `ProductsController`.

### Activity 3-E – `src/users/users.module.ts`

Register the controller and service in the `@Module` decorator.

### Verify it works

```bash
# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria", "email": "maria@example.com", "age": 25, "role": "student"}'

# Should fail – invalid email
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria", "email": "not-an-email", "age": 25}'

# Should fail – age out of range
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria", "email": "m@m.com", "age": 200}'

# Should fail – extra unknown field (forbidden by whitelist)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria", "email": "m@m.com", "age": 20, "password": "secret"}'
```

---

## 7. Testing Your API

You can test endpoints with any of these tools:

### curl (terminal)
```bash
# GET all products
curl http://localhost:3000/products

# GET one product
curl http://localhost:3000/products/1

# POST (create)
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Keyboard", "price": 79.99}'

# PATCH (update)
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 899.99}'

# DELETE
curl -X DELETE http://localhost:3000/products/1
```

### VS Code REST Client extension
Create a file `requests.http` and use the `###` separator between requests.

### Postman / Insomnia
Import a new collection, set base URL to `http://localhost:3000`, and add requests manually.

---

## 8. Bonus Challenges

These are optional extensions to deepen your understanding.

### B1 – Filter tasks by status
Add a `GET /tasks?status=pending` endpoint. Use `@Query('status')` to read the query parameter and filter the array in the service.

### B2 – Search users by email
Add `GET /users/search?email=maria@example.com`. Return `404` if not found.

### B3 – Prevent duplicate emails
In `UsersService.create()`, check if an email already exists in the array. If it does, throw a `ConflictException` (HTTP 409).
```typescript
import { ConflictException } from '@nestjs/common';
// ...
if (this.users.find(u => u.email === dto.email)) {
  throw new ConflictException('Email already registered');
}
```

### B4 – Add a `GET /users/:id/tasks` cross-module route
This is advanced. Inject `TasksService` into `UsersController` (you'll need to export `TasksService` from `TasksModule` first). Return all tasks whose `title` starts with the user's name.

### B5 – Custom validation decorator
Research `registerDecorator` from class-validator and create a `@IsSlug()` decorator that ensures a string contains only lowercase letters, numbers, and hyphens.

---

## 9. Quick Reference

### Generating files with the NestJS CLI

```bash
# Generate a complete module scaffold
nest generate module <name>
nest generate controller <name>
nest generate service <name>
nest generate resource <name>

# Shorthand
nest g mo <name>
nest g co <name>
nest g s <name>
nest g res <name>
```

### Common HTTP status codes in NestJS

| Scenario | Status | How to set it |
|---|---|---|
| Successful read | 200 | default |
| Successful create | 201 | `@HttpCode(HttpStatus.CREATED)` |
| Bad input | 400 | thrown automatically by ValidationPipe |
| Not found | 404 | `throw new NotFoundException(...)` |
| Conflict | 409 | `throw new ConflictException(...)` |
| Server error | 500 | unhandled exception |

### ValidationPipe options (set in `main.ts`)

| Option | Effect |
|---|---|
| `whitelist: true` | strips unknown properties silently |
| `forbidNonWhitelisted: true` | throws 400 on unknown properties |
| `transform: true` | auto-converts strings to numbers/booleans per DTO type |

---

Good luck! Work through each activity in order, and use the Products module as your reference whenever you're unsure.
