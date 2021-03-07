import fastify, {FastifyInstance} from 'fastify';
import isDev from '../utilities/isDev.utility';
import { DEFAULT_PORT, DEFAULT_CONNECTION_STRING } from '@riverdeck/common';
import { authenticateFn, pingFn, validateJwt } from '../utilities/api.utility';
import { serverConfig } from '../utilities/configuration.utility';

export default class ApiProcess {

    private static instance: ApiProcess;

    public static async getInstance(): Promise<ApiProcess>
    {
        if (!this.instance) {
            this.instance = new ApiProcess();
            await this.instance.start();
        }

        return this.instance;
    }

    private fastify: FastifyInstance;

    constructor() {
        this.fastify = this.getApi();
        this.setupRouters();
    }

    async start(): Promise<void>
    {
        const port = await serverConfig.get('port', DEFAULT_PORT);
        await this.fastify.listen(port, '0.0.0.0');
    }

    private getApi(): FastifyInstance {
        return fastify({ 
            logger: isDev,
            ignoreTrailingSlash: true,
            bodyLimit: 1e+7 // 10MB
        });
    }

    private setupRouters(): void {
        this.fastify.get('/ping', pingFn);
        this.fastify.post('/verify', {preHandler:[validateJwt]}, pingFn);
        this.fastify.post('/authenticate', authenticateFn);
    }

    async restart(): Promise<void> {
        await this.fastify.close();
        const port = await serverConfig.get('port', DEFAULT_PORT);
        await this.fastify.listen(port, '0.0.0.0');
    }

}