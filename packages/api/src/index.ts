import { DEFAULT_PORT, serverConfig } from '@riverdeck/common';
import fastify, { FastifyInstance } from 'fastify';
import authenticateComponent from './components/authenticate.component';
import pingComponent from './components/ping.component';
import validationComponent from './components/validation.component';

export default class Api {
  private fastify: FastifyInstance;
  private isDev: boolean;

  constructor(isDev: boolean = false) {
    this.isDev = isDev;
    this.fastify = this.getApi();
    this.setupRouters();
  }

  async start() {
    const port = await serverConfig.ensure('port', DEFAULT_PORT);
    await this.fastify.listen(port, '0.0.0.0');
  }

  private getApi(): FastifyInstance {
    return fastify({
      logger: this.isDev,
      ignoreTrailingSlash: true,
      bodyLimit: 1e7 // 10MB
    });
  }

  private setupRouters(): void {
    this.fastify.get('/ping', pingComponent);
    this.fastify.post('/verify', { preHandler: [validationComponent] }, pingComponent);
    this.fastify.post('/authenticate', authenticateComponent);
  }

  async restart(): Promise<void> {
    await this.fastify.close();
    const port = await serverConfig.ensure('port', DEFAULT_PORT);
    await this.fastify.listen(port, '0.0.0.0');
  }
}
