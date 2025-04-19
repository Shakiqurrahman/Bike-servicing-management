import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { config } from '../../config/config';
import AppError from '../../errors/AppError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import prisma from '../../utils/prisma';
import { TUser } from '../user/userInterface';

const registerUserIntoDB = async (
    payload: TUser,
): Promise<{
    user: Omit<TUser, 'password'>;
    accessToken: string;
    refreshToken: string;
}> => {
    const existUser = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: payload.email,
                },
                {
                    userName: payload.userName,
                },
            ],
        },
    });

    const isVerified = existUser?.isVerified;
    if (existUser && !isVerified) {
        throw new AppError(
            httpStatus.EXPECTATION_FAILED,
            "You already registered but not verified. We sent another verification link.",
        );
    }

    if (existUser) {
        throw new AppError(httpStatus.CONFLICT, 'User already exists.');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword,
        },
    });

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...user } = newUser;

    // generating token
    const accessToken = jwtHelpers.generateToken(
        {
            email: newUser.email,
            role: newUser.role,
            userId: user.id,
        },
        config.ACCESS_TOKEN_SECRET as Secret,
        config.ACCESS_TOKEN_EXPIRY as string,
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            userId: user.id,
        },
        config.REFRESH_TOKEN_SECRET as Secret,
        config.REFRESH_TOKEN_EXPIRY as string,
    );

    return { user, refreshToken, accessToken };
};

const loginUserFromDB = async (payload: {
    userName?: string;
    email?: string;
    password: string;
}): Promise<{
    user: Omit<TUser, 'password'>;
    accessToken: string;
    refreshToken: string;
}> => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: payload.email,
                },
                {
                    userName: payload.userName,
                },
            ],
        },
    });

    if (!user) {
        throw new AppError(
            httpStatus.EXPECTATION_FAILED,
            'Invalid credentials.',
        );
    }

    const isDeleted = user.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.EXPECTATION_FAILED, 'User is deleted.');
    }

    const isVerified = user.isVerified;
    if (!isVerified) {
        throw new AppError(
            httpStatus.EXPECTATION_FAILED,
            "Account not verified. We've sent you a new verification link.",
        );
    }

    const isPasswordValid = await bcrypt.compare(
        payload.password,
        user.password,
    );

    if (!isPasswordValid) {
        throw new AppError(
            httpStatus.EXPECTATION_FAILED,
            'Invalid credentials.',
        );
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...cleanedUser } = user;

    // generating token
    const accessToken = jwtHelpers.generateToken(
        {
            email: user.email,
            userId: user.id,
            role: user.role,
        },
        config.ACCESS_TOKEN_SECRET as Secret,
        config.ACCESS_TOKEN_EXPIRY as string,
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            userId: user.id,
        },
        config.REFRESH_TOKEN_SECRET as Secret,
        config.REFRESH_TOKEN_EXPIRY as string,
    );

    return { user: cleanedUser, accessToken, refreshToken };
};

const generateNewAccessToken = async (
    refreshToken: string,
): Promise<string> => {
    const decoded = jwtHelpers.verifyToken(
        refreshToken,
        config.REFRESH_TOKEN_SECRET as string,
    );

    const { userId } = decoded;

    // checking if the user is exist
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // generating token
    const accessToken = jwtHelpers.generateToken(
        {
            email: user.email,
            userId: user.id,
            role: user.role,
        },
        config.ACCESS_TOKEN_SECRET as Secret,
        config.ACCESS_TOKEN_EXPIRY as string,
    );
    return accessToken;
};

export const authService = {
    registerUserIntoDB,
    loginUserFromDB,
    generateNewAccessToken,
};
