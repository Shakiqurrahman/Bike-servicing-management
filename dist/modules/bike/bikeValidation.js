"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidation = void 0;
const zod_1 = require("zod");
const createBike = zod_1.z.object({
    brand: zod_1.z.string({ required_error: 'Brand is required.' }),
    model: zod_1.z.string({ required_error: 'Model is required.' }),
    year: zod_1.z.number({ required_error: 'year is required.' }),
    customerId: zod_1.z.string({ required_error: 'year is required.' }),
});
exports.bikeValidation = {
    createBike,
};
