import { z } from 'zod';

const createBike = z.object({
    brand: z.string({ required_error: 'Brand is required.' }),
    model: z.string({ required_error: 'Model is required.' }),
    year: z.number({ required_error: 'year is required.' }),
    customerId: z.string({ required_error: 'year is required.' }),
});

export const bikeValidation = {
    createBike,
};
