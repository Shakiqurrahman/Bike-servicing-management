import { Router } from 'express';
import { customerRoutes } from '../modules/customer/customerRoute';

const router = Router();

const moduleRoutes = [
    {
        path: '/customers',
        route: customerRoutes,
    },
    // {
    //     path: '/users',
    //     route: userRoutes,
    // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
