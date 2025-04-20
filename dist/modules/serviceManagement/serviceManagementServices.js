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
exports.serviceManagementServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createServiceFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRecord = yield prisma_1.default.serviceRecord.create({
        data: payload,
    });
    return serviceRecord;
});
const getAllServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_1.default.serviceRecord.findMany();
    return services;
});
const getServiceByIdFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found.');
    }
    return service;
});
const markAsCompletedFromDB = (serviceId, completionDate) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedService = yield prisma_1.default.serviceRecord.update({
        where: {
            serviceId,
        },
        data: {
            completionDate: completionDate
                ? new Date(completionDate)
                : new Date(),
            status: 'done',
        },
    });
    return updatedService;
});
const pendingOrOverduedServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const services = yield prisma_1.default.serviceRecord.findMany({
        where: {
            OR: [
                {
                    status: 'pending',
                },
                {
                    status: 'in_progress',
                    serviceDate: { lt: sevenDaysAgo },
                },
            ],
        },
    });
    return services;
});
exports.serviceManagementServices = {
    createServiceFromDB,
    getAllServiceFromDB,
    getServiceByIdFromDB,
    markAsCompletedFromDB,
    pendingOrOverduedServiceFromDB,
};
