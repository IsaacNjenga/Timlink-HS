import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  password: z.string(),
  phonenumber: z.string(),
  avatar: z.string(),
  role: z.enum(["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE STAFF"]),
});

export const CreateUserSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  password: z.string(),
  phonenumber: z.string(),
  avatar: z.string().optional(),
  role: z.enum(["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE STAFF"]),
});

export const UpdateUserSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string().optional(),
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  password: z.string().optional(),
  phonenumber: z.string().optional(),
  avatar: z.string().optional(),
  role: z
    .enum(["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE STAFF"])
    .optional(),
});

// export type User = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;