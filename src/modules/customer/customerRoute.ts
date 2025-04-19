import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { customerController } from './customerController';
import { customerValidation } from './customerValidation';

const router = Router();

router.post(
    '/',
    validate(customerValidation.create),
    customerController.createCustomer,
);
router.get('/', customerController.getAllCustomers);
router.get('/:cusomerId', customerController.getCustomerById);
router.put(
    '/:cusomerId',
    validate(customerValidation.update),
    customerController.updateCustomerById,
);
router.delete('/:cusomerId', customerController.deleteCustomerById);

export const customerRoutes = router;
