import fs from '../../../node-to-deno/fs.ts';
import path from '../../../node-to-deno/path.ts';

import Require from '../utils/Require.ts';
import { BaseController } from '../core/BaseController.ts';
import controllerInfo from '../info/controllerInfo.ts';
import loadDir from '../utils/loadDir.ts';

export default class ControllerLoader {
    static async loadController(filePath: string) {
        const fileInfo = path.parse(filePath);
        const [clazzName, type, ...suffix] = fileInfo.name.split('.');

        if (suffix.length >= 0 && type === 'controller') {
            const clazz: Function = await Require.default(filePath);

            if (clazz && clazz.prototype && clazz.prototype instanceof BaseController) {
                controllerInfo.setControllersInfo(clazz, null, { clazzName });
            }
        }
    }

    static async loadControllerDir(dirPath: string) {
        if (!fs.existsSync(dirPath)) {
            console.warn(`controller file path is not exists, path:${dirPath}`);

            return;
        }

        await loadDir(dirPath, ControllerLoader.loadController);
    }
}
