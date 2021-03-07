import {app} from 'electron';

export default class AppProcess {

    private static instance: AppProcess;

    public static async getInstance(): Promise<AppProcess>
    {
        if (!this.instance) {
            this.instance = new AppProcess();
            await this.instance.start();
        }

        return this.instance;
    }

    constructor() {
        // Prevent the app from closing once all windows are closed.
        app.on('window-all-closed', () => {});
    }

    async start(): Promise<void>
    {
        await app.whenReady()
    }

}