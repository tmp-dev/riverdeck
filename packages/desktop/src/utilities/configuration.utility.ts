import { homedir } from 'os';
import { resolve } from 'path';
import { APPLICATION_NAME } from '@riverdeck/common';
import { ensureFile, pathExists } from 'fs-extra';

class AbstractConfig {
    protected fileName = 'config.yml';

    protected getDefaultConfigDir(): string
    {
        return resolve(homedir(), '.config', APPLICATION_NAME);
    }

    protected getConfigDirs(): string[]
    {
        return [
            this.getDefaultConfigDir(),
        ]
    }

    protected async getConfigDir(): Promise<string|null>
    {
        for (const configDir in this.getConfigDirs()) {
            if (await pathExists(configDir)) {
                return configDir;
            }
        }
        
        return null;
    }

    async load(): Promise<void>
    {
        const configDir = await this.getConfigDir();
        if (configDir) {
            const configFile = resolve(configDir, this.fileName);   
        } else {
            const configFile = resolve(this.getDefaultConfigDir(), this.fileName);
            ensureFile(configFile);
            // TODO: write example file
        }

        // TODO: Load file
    }

    // TODO: Write config getters and setters.
}

class DeviceConfig extends AbstractConfig {
    protected fileName = 'device.yml';

}

class ServerConfig extends AbstractConfig {
    protected fileName = 'server.yml';
    
}

class ClientConfig extends AbstractConfig {
    protected fileName = 'client.yml';
    
}

export const deviceConfig = new DeviceConfig();
export const serverConfig = new ServerConfig();
export const clientConfig = new ClientConfig();