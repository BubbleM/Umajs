import fs from '../../../node-to-deno/fs.ts';
import path from '../../../node-to-deno/path.ts';

import Require from '../utils/Require.ts';
import loadDir from '../utils/loadDir.ts';
import typeHelper from '../utils/typeHelper.ts';
import { ResourceClazzMap } from '../decorators/Resource.ts';
import controllerInfo from '../info/controllerInfo.ts';
import { BaseController } from '../core/BaseController.ts';
import { BaseService } from '../core/BaseService.ts';
import { ServiceMap } from './ServiceLoader.ts';

export const ResourceMap: Map<string, Function> = new Map();
export const ResourceClassMap: Map<Function, Function> = new Map();

export default class ResourceLoader {
    static getResource(resource: string | Function) {
        return typeHelper.isString(resource) ? ResourceMap.get(resource) : ResourceClassMap.get(resource);
    }

    static async loadResource(filePath: string) {
        try {
            const clazz = await Require.default(filePath);
            const clazzName = path.basename(filePath).split('.')[0];

            if (ResourceClazzMap.has(clazz)) {
                const clazzInstance = Reflect.construct(clazz, ResourceClazzMap.get(clazz)!);

                ResourceMap.set(clazzName, clazzInstance);
                ResourceClassMap.set(clazz, clazzInstance);
            }

            if (clazz && clazz.prototype && clazz.prototype instanceof BaseController) {
                controllerInfo.setControllersInfo(clazz, null, { clazzName });
            }

            if (clazz && clazz.prototype && clazz.prototype instanceof BaseService) {
                ServiceMap.set(clazzName, clazz);
            }
        } catch (err) {
            // if (process.env.NODE_ENV === 'debugger') console.log(err);
        }
    }

    static loadResourceDir(dirPath: string, ignoreDirs: string[] = []) {
        if (!fs.existsSync(dirPath)) {
            return;
        }

        loadDir(dirPath, ResourceLoader.loadResource, ignoreDirs);
    }
}
