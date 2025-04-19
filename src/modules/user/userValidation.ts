import { z } from 'zod';

const updateSchema = z.object({
    fullName: z.string().optional(),
    avatar: z.string().optional(),
    designation: z.string().optional(),
});

export const userValidation = { updateSchema };
