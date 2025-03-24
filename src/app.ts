require('dotenv').config();
import {server} from "./server/server";
const Server=new server();
Server.execute();