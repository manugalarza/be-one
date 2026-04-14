declare const UserRole: readonly ["student", "teacher", "admin"];
type UserRole = (typeof UserRole)[number];
export declare class CreateUserDto {
    name: string;
    email: string;
    age: number;
    role?: UserRole;
}
export {};
