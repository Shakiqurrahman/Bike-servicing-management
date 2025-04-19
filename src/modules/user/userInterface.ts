import { User_Role } from '@prisma/client';

export type TUser = {
    fullName: string;
    userName: string;
    email: string;
    avatar?: string | null;
    designation?: string | null;
    password: string;
    role: User_Role;
    isDeleted: boolean;
};
