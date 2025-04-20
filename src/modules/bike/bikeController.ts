import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bikeServices } from './bikeServices';

const createBike = catchAsync(async (req, res) => {
    const bike = await bikeServices.createBikeFromDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: 'Bike added successfully',
        data: bike,
    });
});

const getAllBike = catchAsync(async (req, res) => {
    const bikes = await bikeServices.getAllBikeFromDB();

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Bikes fetched successfully',
        data: bikes,
    });
});

const getBikeById = catchAsync(async (req, res) => {
    const { bikeId } = req.params;
    const bike = await bikeServices.getBikeByIdFromDB(bikeId);

    sendResponse(res, {
        success: true,
        statusCode: status.OK,
        message: 'Bike fetched successfully',
        data: bike,
    });
});

export const bikeControllers = {
    createBike,
    getAllBike,
    getBikeById,
};
