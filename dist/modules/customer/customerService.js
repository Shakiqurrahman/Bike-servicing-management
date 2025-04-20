"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createCustomerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existCustomer = yield prisma_1.default.customer.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existCustomer) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'A customer with this email already exists.');
    }
    const newCustomer = yield prisma_1.default.customer.create({
        data: payload,
    });
    return newCustomer;
});
const getAllCustomersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield prisma_1.default.customer.findMany({
        where: {
            isDeleted: false,
        },
    });
    return customers;
});
const getCustomerByIdFromDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.default.customer.findUnique({
        where: {
            customerId,
            isDeleted: false,
        },
    });
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found.');
    }
    return customer;
});
const updateCustomerFromDB = (customerId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.default.customer.findUnique({
        where: {
            customerId,
            isDeleted: false,
        },
    });
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found.');
    }
    const updatedCustomer = yield prisma_1.default.customer.update({
        where: {
            customerId,
        },
        data: payload,
    });
    return updatedCustomer;
});
const deleteCustomerFromDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.default.customer.findUnique({
        where: {
            customerId,
            isDeleted: false,
        },
    });
    if (!customer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found.');
    }
    yield prisma_1.default.customer.update({
        where: {
            customerId,
        },
        data: {
            isDeleted: true,
        },
    });
    return;
});
exports.customerService = {
    createCustomerIntoDB,
    getAllCustomersFromDB,
    getCustomerByIdFromDB,
    updateCustomerFromDB,
    deleteCustomerFromDB,
};
