import { homedir } from 'os';
import { resolve } from 'path';
import { APPLICATION_NAME } from '@riverdeck/common';
import { ensureFile, pathExists, readFile, writeFile } from 'fs-extra';
import { stringify, parse } from 'yaml';
import { get, set, has } from 'lodash';

class AbstractConfig {
    protected fileName = 'config.yml';

    protected configDefaults = {
        'version': '1.0.0'
    }
    
    protected data: any = null;

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

    private async getConfigFile() {
        const configDir = await this.getConfigDir();
        let configFile;
        if (configDir) {
            configFile = resolve(configDir, this.fileName);
        } else {
            configFile = resolve(this.getDefaultConfigDir(), this.fileName);
            await ensureFile(configFile);
            await writeFile(configFile, stringify(this.configDefaults), 'utf8');
        }
        return configFile;
    }

    async load(): Promise<void>
    {
        let configFile = await this.getConfigFile();
        const content = await readFile(configFile, 'utf8');
        this.data = parse(content);
    }

    async save(): Promise<void>
    {
        if (!this.data) {
            this.data = this.configDefaults;
        }
        let configFile = await this.getConfigFile();
        await writeFile(configFile, parse(this.data), 'utf8');
    }

    async get(path: string, defaultValue: any = null) {
        await this.load();
        const result = get(this.data, path, defaultValue);
        if (result !== null && result === defaultValue) {
            await this.set(path, defaultValue);
        }
        return result;
    }

    async set(path: string, value: any) {
        await this.load();
        const result = set(this.data, path, value);
        await this.save();
        return result;
    }

    async has(path: string) {
        await this.load();
        return has(this.data, path);
    }
}

class DeviceConfig extends AbstractConfig {
    protected fileName = 'device.yml';

    protected configDefaults = {
        'version': '1.0.0'
    }
    
    protected data: {
        version:string,
        deviceName:string,
    }|null = null;


}

class ServerConfig extends AbstractConfig {
    protected fileName = 'server.yml';

    protected configDefaults = {
        'version': '1.0.0'
    }
    
    protected data: {
        version:string
    }|null = null;
    
}

class ClientConfig extends AbstractConfig {
    protected fileName = 'client.yml';

    protected configDefaults = {
        'version': '1.0.0'
    }
    
    protected data: {
        version:string
    }|null = null;
    
}

export const deviceConfig = new DeviceConfig();
export const serverConfig = new ServerConfig();
export const clientConfig = new ClientConfig();