"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required.' }),
    email: zod_1.z
        .string({ required_error: 'Email is required.' })
        .email({ message: 'Invalid email format.' }),
    phone: zod_1.z.string({ required_error: 'phone is required.' }),
});
const update = create.partial();
exports.customerValidation = {
    create,
    update,
};
