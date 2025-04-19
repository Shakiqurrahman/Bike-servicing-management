import { z } from 'zod';

const create = z.object({
    name: z.string({ required_error: 'Name is required.' }),
    email: z
        .string({ required_error: 'Email is required.' })
        .email({ message: 'Invalid email format.' }),
    phone: z.string({ required_error: 'phone is required.' }),
});

const update = create.partial();

export const customerValidation = {
    create,
    update,
};
