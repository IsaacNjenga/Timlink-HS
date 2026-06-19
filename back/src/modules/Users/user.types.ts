export type UserRole = "SUPER_ADMIN" | "FINANCE" | "CASE_MANAGER" | "SERVICE STAFF";
export type UserGender = "MALE" | "FEMALE" | "OTHER";

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  gender?: UserGender;
  password: string;
  phonenumber: string;
  avatar: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  gender?: UserGender;
  password: string;
  phonenumber: string;
  avatar: string;
  role: UserRole;
}

export interface UpdateUserDTO {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  gender?: UserGender;
  avatar?: string;
  phonenumber?: string;
  dateOfBirth?: Date;
  role?: UserRole;
  bio?: string;
}