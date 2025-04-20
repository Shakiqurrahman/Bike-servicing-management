import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { bikeControllers } from './bikeController';
import { bikeValidation } from './bikeValidation';

const router = Router();

router.post(
    '/',
    validate(bikeValidation.createBike),
    bikeControllers.createBike,
);

router.get('/', bikeControllers.getAllBike);
router.get('/:bikeId', bikeControllers.getBikeById);

export const bikeRoutes = router;
