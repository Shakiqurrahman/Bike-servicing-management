import { z } from 'zod';

const createService = z.object({
    bikeId: z.string({ required_error: 'Bike Id is required.' }),
    serviceDate: z.string({ required_error: 'serviceDate is required.' }),
    description: z.string({ required_error: 'description is required.' }),
    status: z.enum(['pending', 'in_progress', 'done']),
    completionDate: z.string().optional(),
});

const markAsCompleted = z
    .object({
        completionDate: z.string().optional(),
    })
    .optional();

export const serviceManagementValidation = {
    createService,
    markAsCompleted,
};
