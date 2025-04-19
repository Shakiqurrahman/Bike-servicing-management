import { z } from 'zod';

const register = z.object({
    fullName: z.string({
        required_error: 'Full Name is required.',
    }),
    userName: z.string({
        required_error: 'Username is required.',
    }),
    email: z
        .string({
            required_error: 'Email is required.',
        })
        .email(),
    password: z
        .string({ required_error: 'Password is required.' })
        .min(8, 'Password must be at least 8 characters.'),
    role: z.enum(['USER', 'ADMIN', 'FACULTY']).default('USER'),
    isDeleted: z.boolean().default(false),
});

const login = z
    .object({
        email: z
            .string({
                required_error: 'Email is required.',
            })
            .email()
            .optional(),
        userName: z
            .string({
                required_error: 'Username is required.',
            })
            .optional(),
        password: z
            .string({ required_error: 'Password is required.' })
            .min(8, 'Password must be at least 8 characters.'),
    })
    .refine((data) => data.email || data.userName, {
        message: 'Either userName or email is required.',
        path: ['email', 'userName'],
    });

export const authValidation = {
    register,
    login,
};
