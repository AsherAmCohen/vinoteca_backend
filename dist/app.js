"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const server_1 = require("./server/server");
const Server = new server_1.server();
Server.execute();
