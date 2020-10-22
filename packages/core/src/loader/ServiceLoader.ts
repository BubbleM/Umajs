import fs from '../../../node-to-deno/fs.ts';
import path from '../../../node-to-deno/path.ts';

import Require from '../utils/Require.ts';
import loadDir from '../utils/loadDir.ts';
import { BaseService } from '../core/BaseService.ts';

export const ServiceMap: Map<string, Function> = new Map();

export default class ServiceLoader {
    static getService(serviceName: string) {
        return ServiceMap.get(serviceName);
    }

    static async loadService(filePath: string) {
        const fileInfo = path.parse(filePath);
        const [clazzName, type, ...suffix] = fileInfo.name.split('.');

        if (suffix.length === 1 && type === 'service') {
            const clazz: Function = await Require.default(filePath);

            if (clazz && clazz.prototype && clazz.prototype instanceof BaseService) {
                ServiceMap.set(clazzName, clazz);
            }
        }
    }

    static loadServiceDir(dirPath: string) {
        if (!fs.existsSync(dirPath)) return;

        loadDir(dirPath, ServiceLoader.loadService);
    }
}
