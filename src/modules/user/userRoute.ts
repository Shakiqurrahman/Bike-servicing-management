import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { userController } from './userController';
import { userValidation } from './userValidation';

const router = Router();

router.get('/:userId', userController.getUserById);
router.patch(
    '/:userId',
    validate(userValidation.updateSchema),
    userController.updateUserById,
);

export const userRoutes = router;
