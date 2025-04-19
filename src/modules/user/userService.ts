import status from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { TUser } from './userInterface';

const getUserByIdFromDB = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
            isVerified: true,
        },
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'User not found!');
    }

    return user;
};

const updateUserFromDB = async (userId: string, payload: Partial<TUser>) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
            isVerified: true,
        },
    });

    if (!user) {
        throw new AppError(status.NOT_FOUND, 'User not found!');
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: payload,
    });

    return updatedUser;
};

export const userService = {
    getUserByIdFromDB,
    updateUserFromDB,
};
