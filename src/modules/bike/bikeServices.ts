import status from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { IBikePayload } from './bikeInterface';

const createBikeFromDB = async (payload: IBikePayload) => {
    const newBike = await prisma.bike.create({
        data: payload,
    });

    return newBike;
};

const getAllBikeFromDB = async () => {
    const bikes = await prisma.bike.findMany();
    return bikes;
};

const getBikeByIdFromDB = async (bikeId: string) => {
    const bike = await prisma.bike.findUnique({
        where: {
            bikeId,
        },
    });

    if (!bike) {
        throw new AppError(status.NOT_FOUND, 'Bike not found.');
    }

    return bike;
};

export const bikeServices = {
    createBikeFromDB,
    getAllBikeFromDB,
    getBikeByIdFromDB,
};
