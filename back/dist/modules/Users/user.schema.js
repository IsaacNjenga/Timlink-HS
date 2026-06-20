"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string().email("Invalid email format").toLowerCase().trim(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    password: zod_1.z.string(),
    phonenumber: zod_1.z.string(),
    avatar: zod_1.z.string(),
    role: zod_1.z.enum(["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE STAFF"]),
});
exports.CreateUserSchema = zod_1.z.object({
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    username: zod_1.z.string(),
    email: zod_1.z.string().email("Invalid email format").toLowerCase().trim(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    password: zod_1.z.string(),
    phonenumber: zod_1.z.string(),
    avatar: zod_1.z.string().optional(),
    role: zod_1.z.enum(["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE STAFF"]),
});
exports.UpdateUserSchema = zod_1.z.object({
    firstname: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional(),
    username: zod_1.z.string().optional(),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .toLowerCase()
        .trim()
        .optional(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    password: zod_1.z.string().optional(),
    phonenumber: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
    role: zod_1.z
        .enum(["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE STAFF"])
        .optional(),
});
//# sourceMappingURL=user.schema.js.map