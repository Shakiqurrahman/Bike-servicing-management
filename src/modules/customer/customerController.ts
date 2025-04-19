import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { customerService } from './customerService';

const createCustomer = catchAsync(async (req, res) => {
    const customer = await customerService.createCustomerIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Customer created successfully',
        data: customer,
    });
});

const getAllCustomers = catchAsync(async (req, res) => {
    const customers = await customerService.getAllCustomersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customers fetched successfully',
        data: customers,
    });
});

const getCustomerById = catchAsync(async (req, res) => {
    const { cusomerId } = req.params;
    const customer = await customerService.getCustomerByIdFromDB(cusomerId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customer fetched successfully',
        data: customer,
    });
});

const updateCustomerById = catchAsync(async (req, res) => {
    const { cusomerId } = req.params;
    const updatedCustomer = await customerService.updateCustomerFromDB(
        cusomerId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customer updated successfully',
        data: updatedCustomer,
    });
});

const deleteCustomerById = catchAsync(async (req, res) => {
    const { cusomerId } = req.params;
    await customerService.deleteCustomerFromDB(cusomerId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customer deleted successfully',
    });
});

export const customerController = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById,
};
