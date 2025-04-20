import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { serviceManagementController } from './serviceManagementController';
import { serviceManagementValidation } from './serviceManagementValidation';

const router = Router();

router.post(
    '/',
    validate(serviceManagementValidation.createService),
    serviceManagementController.createService,
);
router.get('/', serviceManagementController.getAllService);
//pending or overdue service
router.get('/status', serviceManagementController.pendingOrOverduedService);
router.get('/:serviceId', serviceManagementController.getServiceById);
router.put(
    '/:serviceId/complete',
    validate(serviceManagementValidation.markAsCompleted),
    serviceManagementController.markAsCompleted,
);

export const serviceManagementRoutes = router;
