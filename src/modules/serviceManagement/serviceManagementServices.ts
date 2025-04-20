import status from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { IServicePayload } from './serviceManagementInterface';

const createServiceFromDB = async (payload: IServicePayload) => {
    const serviceRecord = await prisma.serviceRecord.create({
        data: payload,
    });

    return serviceRecord;
};

const getAllServiceFromDB = async () => {
    const services = await prisma.serviceRecord.findMany();
    return services;
};

const getServiceByIdFromDB = async (serviceId: string) => {
    const service = await prisma.serviceRecord.findUnique({
        where: {
            serviceId,
        },
    });

    if (!service) {
        throw new AppError(status.NOT_FOUND, 'Service not found.');
    }

    return service;
};

const markAsCompletedFromDB = async (
    serviceId: string,
    completionDate?: string,
) => {
    const updatedService = await prisma.serviceRecord.update({
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
};

const pendingOrOverduedServiceFromDB = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const services = await prisma.serviceRecord.findMany({
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
};

export const serviceManagementServices = {
    createServiceFromDB,
    getAllServiceFromDB,
    getServiceByIdFromDB,
    markAsCompletedFromDB,
    pendingOrOverduedServiceFromDB,
};
