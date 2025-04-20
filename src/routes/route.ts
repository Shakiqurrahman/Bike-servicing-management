import { Router } from 'express';
import { bikeRoutes } from '../modules/bike/bikeRoutes';
import { customerRoutes } from '../modules/customer/customerRoute';
import { serviceManagementRoutes } from '../modules/serviceManagement/serviceManagementRoutes';

const router = Router();

const moduleRoutes = [
    {
        path: '/customers',
        route: customerRoutes,
    },
    {
        path: '/bikes',
        route: bikeRoutes,
    },
    {
        path: '/services',
        route: serviceManagementRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
