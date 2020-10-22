import fs from '../../../node-to-deno/fs.ts';
import path from '../../../node-to-deno/path.ts';

import Require from '../utils/Require.ts';
import { TConfig } from '../types/TConfig.ts';
import loadDir from '../utils/loadDir.ts';

export default class ConfigLoader {
    static config: TConfig = {
        plugin: {},
    };

    static async loadConfig(filePath: string) {
        const fileInfo = path.parse(filePath);
        const [configName, type, ...suffix] = fileInfo.name.split('.');

        if (suffix.length >= 0 && type === 'config') {
            const fileConfig = await Require.default(filePath);

            Reflect.set(ConfigLoader.config, configName, fileConfig);
        }
    }

    static async loadConfigDir(dirPath: string) {
        if (!fs.existsSync(dirPath)) return;

        await loadDir(dirPath, ConfigLoader.loadConfig);
    }
}
