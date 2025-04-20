"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            server = app_1.app.listen(config_1.config.PORT, () => {
                console.log(`✔ Server started at ${config_1.config.PORT} `);
            });
        }
        catch (err) {
            console.log('Error starting server:', err);
        }
        process.on('unhandledRejection', () => {
            console.log('❗Unhandled Rejection at:', new Date().toISOString());
            if (server) {
                server.close(() => {
                    process.exit(1);
                });
            }
            process.exit(1);
        });
        process.on('uncaughtException', () => {
            console.log('❗UncaughtException at:', new Date().toISOString());
            process.exit(1);
        });
    });
}
main();
