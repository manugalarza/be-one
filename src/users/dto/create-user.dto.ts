// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-A  ·  Create the User DTO from scratch
// ─────────────────────────────────────────────────────────────────────────────
// A User must have:
//   - name    → required string, 2–50 chars
//   - email   → required, must be a valid email address
//               hint: @IsEmail() from class-validator
//   - age     → required number, integer, minimum 1, maximum 120
//               hint: @IsInt(), @Min(), @Max()
//   - role    → optional string; allowed values: 'student' | 'teacher' | 'admin'
//
// Steps:
//   1. Import the decorators you need from 'class-validator'
//   2. Define the class with the correct properties
//   3. Add a decorator to each property
// ─────────────────────────────────────────────────────────────────────────────

import { IsString, IsEnum, IsOptional, MaxLength, MinLength, IsEmail, Max, Min, IsInt, IsNumber } from "class-validator";

const UserRole = ['student', 'teacher', 'admin'] as const;
type UserRole = (typeof UserRole)[number];

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email?: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}