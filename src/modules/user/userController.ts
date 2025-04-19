import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './userService';

const getUserById = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const user = await userService.getUserByIdFromDB(userId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User retrived successfully!',
        data: user,
    });
});

const updateUserById = catchAsync(async (req, res) => {
    const { userId } = req.params;

    const updatedUser = await userService.updateUserFromDB(userId, req.body);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'User updated successfully!',
        data: updatedUser,
    });
});

export const userController = {
    getUserById,
    updateUserById,
};
