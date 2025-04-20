import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { serviceManagementServices } from './serviceManagementServices';

const createService = catchAsync(async (req, res) => {
    const service = await serviceManagementServices.createServiceFromDB(
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: 'Service record created successfully',
        data: service,
    });
});

const getAllService = catchAsync(async (req, res) => {
    const services = await serviceManagementServices.getAllServiceFromDB();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Service records fetched successfully',
        data: services,
    });
});

const getServiceById = catchAsync(async (req, res) => {
    const { serviceId } = req.params;

    const service =
        await serviceManagementServices.getServiceByIdFromDB(serviceId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Service record fetched successfully',
        data: service,
    });
});

const markAsCompleted = catchAsync(async (req, res) => {
    const { serviceId } = req.params;

    const service = await serviceManagementServices.markAsCompletedFromDB(
        serviceId,
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Service marked as completed',
        data: service,
    });
});

const pendingOrOverduedService = catchAsync(async (req, res) => {
    const services =
        await serviceManagementServices.pendingOrOverduedServiceFromDB();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Overdue or pending services fetched successfully',
        data: services,
    });
});

export const serviceManagementController = {
    createService,
    getAllService,
    getServiceById,
    markAsCompleted,
    pendingOrOverduedService,
};
