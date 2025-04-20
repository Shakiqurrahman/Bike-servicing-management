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
exports.bikeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createBikeFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBike = yield prisma_1.default.bike.create({
        data: payload,
    });
    return newBike;
});
const getAllBikeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bikes = yield prisma_1.default.bike.findMany();
    return bikes;
});
const getBikeByIdFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const bike = yield prisma_1.default.bike.findUnique({
        where: {
            bikeId,
        },
    });
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found.');
    }
    return bike;
});
exports.bikeServices = {
    createBikeFromDB,
    getAllBikeFromDB,
    getBikeByIdFromDB,
};
