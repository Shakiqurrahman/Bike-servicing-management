"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlePrismaError = (err) => {
    var _a, _b, _c, _d;
    const statusCode = 400;
    let message = 'Database Error';
    let errorSources = [];
    switch (err.code) {
        case 'P2002':
            // Unique constraint failed (duplicate entry)
            const target = (_b = (_a = err.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b[0];
            message = `${target} already exists`;
            errorSources = [{ path: target || '', message }];
            break;
        case 'P2003':
            // Foreign key constraint failed
            const fkField = ((_c = err.meta) === null || _c === void 0 ? void 0 : _c.field_name) || 'Foreign key';
            message = `Invalid reference for ${fkField}`;
            errorSources = [{ path: fkField, message }];
            break;
        case 'P2025':
            // Record not found
            message = ((_d = err.meta) === null || _d === void 0 ? void 0 : _d.cause) || 'Record not found';
            errorSources = [{ path: '', message }];
            break;
        default:
            // fallback
            errorSources = [{ path: '', message: err.message }];
            break;
    }
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handlePrismaError;
