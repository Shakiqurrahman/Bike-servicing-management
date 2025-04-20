import { Router } from 'express';
import { bikeRoutes } from '../modules/bike/bikeRoutes';
import { customerRoutes } from '../modules/customer/customerRoute';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
