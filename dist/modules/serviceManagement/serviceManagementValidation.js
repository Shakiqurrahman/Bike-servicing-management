"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceManagementValidation = void 0;
const zod_1 = require("zod");
const createService = zod_1.z.object({
    bikeId: zod_1.z.string({ required_error: 'Bike Id is required.' }),
    serviceDate: zod_1.z.string({ required_error: 'serviceDate is required.' }),
    description: zod_1.z.string({ required_error: 'description is required.' }),
    status: zod_1.z.enum(['pending', 'in_progress', 'done']),
    completionDate: zod_1.z.string().optional(),
});
const markAsCompleted = zod_1.z
    .object({
    completionDate: zod_1.z.string().optional(),
})
    .optional();
exports.serviceManagementValidation = {
    createService,
    markAsCompleted,
};
