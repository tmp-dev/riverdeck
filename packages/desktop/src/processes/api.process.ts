import Api from '@riverdeck/api';
import isDev from '../components/isDev.component';

export default class ApiProcess {
  private static instance: ApiProcess;

  public static async getInstance(): Promise<ApiProcess> {
    if (!this.instance) {
      this.instance = new ApiProcess();
      await this.instance.start();
    }

    return this.instance;
  }

  private api: Api;

  constructor() {
    this.api = new Api(isDev);
  }

  async start(): Promise<void> {
    await this.api.start();
  }

  async restart(): Promise<void> {
    await this.api.restart();
  }
}
