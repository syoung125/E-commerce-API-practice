import { json, urlencoded } from 'body-parser';
import { Application } from 'express';
import { Service } from 'typedi';

import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import * as http from 'http';

import { Api } from './api/api';
import { config } from '../config/environment';

import { AuthController } from '../app/auth/auth.controller';

@Service()
export class Server {

  app: Application;
  httpServer: http.Server;

  constructor(private readonly api: Api,
              private authController: AuthController) {
    this.app = express();
    this.setupServer();
  }
  
  private setupServer(): void {
    this.app.use(cors());
    this.app.use(json({ limit: '5mb' }));
    this.app.use(urlencoded({ extended: false }));
    this.app.use(morgan('dev'));

    this.app.use('/auth', this.api.getAuthRouter());
    this.app.use('/api', this.authController.verifyApiRequest);
    this.app.use('/api', this.api.getApiRouter());

    this.httpServer = this.app.listen(config.port, this.onHttpServerListening);
  }

  private onHttpServerListening(): void {
    console.log('Server Express started in %s mode (ip: %s, port: %s)', config.env, config.ip, config.port);
  }

}
