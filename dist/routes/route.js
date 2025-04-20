"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bikeRoutes_1 = require("../modules/bike/bikeRoutes");
const customerRoute_1 = require("../modules/customer/customerRoute");
const serviceManagementRoutes_1 = require("../modules/serviceManagement/serviceManagementRoutes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/customers',
        route: customerRoute_1.customerRoutes,
    },
    {
        path: '/bikes',
        route: bikeRoutes_1.bikeRoutes,
    },
    {
        path: '/services',
        route: serviceManagementRoutes_1.serviceManagementRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
