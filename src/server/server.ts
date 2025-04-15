import express, { Express } from "express";
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';

export class server{
    private app: Express;
    private server: any;
    public port: number;

    constructor(){
        this.app=express();
        this.port=parseInt(`${process.env.PORT}`);
        this.server=http.createServer(this.app);
    }

    middlaware(){
        this.app.use(cors({origin:'*'}));
        this.app.use(cookieParser());
        this.app.use(responseTime());
    }

    settingPublicRoute(){
        const public_path=path.resolve(__dirname,'../storage');
        this.app.use(express.static(public_path));
    }

    settingLogFile(){
        let log=fs.createWriteStream(path.join(__dirname,'../../log/bitacora.log'),{flags:'a'});
        this.app.use(morgan('combined', {stream:log}));
    }

    settingDataFormProcess(){
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
    }

    settingRouters(){
        const apirouter=require('../routes/routes');
        this.app.use('/', apirouter);
    }

    execute(){
        this.middlaware();
        this.settingPublicRoute();
        this.settingLogFile();
        this.settingDataFormProcess();
        this.settingRouters();
        this.server.listen(this.port,()=>{
            console.log (`servidor iniciado: http://localhost:${this.port}`)
        })
    }
}