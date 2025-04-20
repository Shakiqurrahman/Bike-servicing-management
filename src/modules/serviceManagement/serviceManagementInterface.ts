import { ServiceStatus } from '../../../prisma/generated/prisma-client';

export interface IServicePayload {
    bikeId: string;
    serviceDate: string;
    description: string;
    completionDate?: string;
    status: ServiceStatus;
}
