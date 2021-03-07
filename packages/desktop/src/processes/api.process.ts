import fastly, {FastifyInstance} from 'fastify';
import isDev from '../utilities/isDev.utility';
import { DEFAULT_PORT, DEFAULT_CONNECTION_STRING } from '@riverdeck/common';
import { pingFn } from '../utilities/api.utility';

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

    private fastly: FastifyInstance;

    constructor() {
        this.fastly = this.getApi();
        this.setupRouters();
    }

    async start(): Promise<void>
    {
        await this.fastly.listen(DEFAULT_PORT, '0.0.0.0');
    }

    private getApi(): FastifyInstance {
        return fastly({ 
            logger: isDev,
            ignoreTrailingSlash: true,
            bodyLimit: 1e+7 // 10MB
        });
    }

    private setupRouters(): void {
        this.fastly.get('/ping', pingFn);
    }

    async restart(): Promise<void> {
        await this.fastly.close();
        await this.fastly.listen(DEFAULT_PORT, '0.0.0.0');
    }

}