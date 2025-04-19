import status from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { ICusomerPayload } from './customerInterface';

const createCustomerIntoDB = async (payload: ICusomerPayload) => {
    const existCustomer = await prisma.customer.findUnique({
        where: {
            email: payload.email,
        },
    });

    if (existCustomer) {
        throw new AppError(
            status.CONFLICT,
            'A customer with this email already exists.',
        );
    }

    const newCustomer = await prisma.customer.create({
        data: payload,
    });

    return newCustomer;
};

const getAllCustomersFromDB = async () => {
    const customers = await prisma.customer.findMany({
        where: {
            isDeleted: false,
        },
    });

    return customers;
};

const getCustomerByIdFromDB = async (customerId: string) => {
    const customer = await prisma.customer.findUnique({
        where: {
            customerId,
            isDeleted: false,
        },
    });

    if (!customer) {
        throw new AppError(status.NOT_FOUND, 'Customer not found.');
    }

    return customer;
};

const updateCustomerFromDB = async (
    customerId: string,
    payload: Partial<ICusomerPayload>,
) => {
    const customer = await prisma.customer.findUnique({
        where: {
            customerId,
            isDeleted: false,
        },
    });

    if (!customer) {
        throw new AppError(status.NOT_FOUND, 'Customer not found.');
    }

    const updatedCustomer = await prisma.customer.update({
        where: {
            customerId,
        },
        data: payload,
    });

    return updatedCustomer;
};

const deleteCustomerFromDB = async (customerId: string) => {
    const customer = await prisma.customer.findUnique({
        where: {
            customerId,
            isDeleted: false,
        },
    });

    if (!customer) {
        throw new AppError(status.NOT_FOUND, 'Customer not found.');
    }

    await prisma.customer.update({
        where: {
            customerId,
        },
        data: {
            isDeleted: true,
        },
    });

    return;
};

export const customerService = {
    createCustomerIntoDB,
    getAllCustomersFromDB,
    getCustomerByIdFromDB,
    updateCustomerFromDB,
    deleteCustomerFromDB,
};
