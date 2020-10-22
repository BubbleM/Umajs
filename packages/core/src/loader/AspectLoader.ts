import fs from '../../../node-to-deno/fs.ts';
import path from '../../../node-to-deno/path.ts';

import Require from '../utils/Require.ts';
import loadDir from '../utils/loadDir.ts';
import typeHelper from '../utils/typeHelper.ts';
import { IAspect } from '../types/IAspect.ts';

export const AspectMap: Map<string, IAspect> = new Map();
export const AspectClassMap: Map<IAspect, IAspect> = new Map();

export default class AspectLoader {
    static getAspect(aspect: string | IAspect) {
        return typeHelper.isString(aspect) ? AspectMap.get(aspect) : AspectClassMap.get(aspect);
    }

    static async loadAspect(filePath: string) {
        const fileInfo = path.parse(filePath);
        const [clazzName, type, ...suffix] = fileInfo.name.split('.');

        if (suffix.length >= 0 && type === 'aspect') {
            const clazz: IAspect = await Require.default(filePath);
            AspectMap.set(clazzName, clazz);
            AspectClassMap.set(clazz, clazz);
        }
    }

    static async loadAspectDir(dirPath: string) {
        if (!fs.existsSync(dirPath)) return;

        await loadDir(dirPath, AspectLoader.loadAspect);
    }
}
