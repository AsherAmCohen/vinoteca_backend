"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const response_time_1 = __importDefault(require("response-time"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
class server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(`${process.env.PORT}`);
        this.server = http_1.default.createServer(this.app);
    }
    middlaware() {
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, response_time_1.default)());
    }
    settingPublicRoute() {
        const public_path = path_1.default.resolve(__dirname, '../storage');
        this.app.use(express_1.default.static(public_path));
    }
    settingLogFile() {
        let log = fs_1.default.createWriteStream(path_1.default.join(__dirname, '../../log/bitacora.log'), { flags: 'a' });
        this.app.use((0, morgan_1.default)('combined', { stream: log }));
    }
    settingDataFormProcess() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
    }
    settingRouters() {
        const apirouter = require('../router/router');
        this.app.use('/', apirouter);
    }
    execute() {
        this.middlaware();
        this.settingPublicRoute();
        this.settingLogFile();
        this.settingDataFormProcess();
        this.settingRouters();
        this.server.listen(this.port, () => {
            console.log(`servidor iniciado: http://localhost:${this.port}`);
        });
    }
}
exports.server = server;
