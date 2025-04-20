"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceManagementRoutes = void 0;
const express_1 = require("express");
const validate_1 = require("../../middlewares/validate");
const serviceManagementController_1 = require("./serviceManagementController");
const serviceManagementValidation_1 = require("./serviceManagementValidation");
const router = (0, express_1.Router)();
router.post('/', (0, validate_1.validate)(serviceManagementValidation_1.serviceManagementValidation.createService), serviceManagementController_1.serviceManagementController.createService);
router.get('/', serviceManagementController_1.serviceManagementController.getAllService);
//pending or overdue service
router.get('/status', serviceManagementController_1.serviceManagementController.pendingOrOverduedService);
router.get('/:serviceId', serviceManagementController_1.serviceManagementController.getServiceById);
router.put('/:serviceId/complete', (0, validate_1.validate)(serviceManagementValidation_1.serviceManagementValidation.markAsCompleted), serviceManagementController_1.serviceManagementController.markAsCompleted);
exports.serviceManagementRoutes = router;
