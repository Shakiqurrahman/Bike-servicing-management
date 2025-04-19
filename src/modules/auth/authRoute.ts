import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { authController } from './authController';
import { authValidation } from './authValidation';

const router = Router();

router.post(
    '/register',
    validate(authValidation.register),
    authController.registerUser,
);
router.post('/login', authController.loginUser);
// router.post('/refresh-token', authController.refreshToken);

export const authRoutes = router;
