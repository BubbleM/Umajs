import fs from '../../../node-to-deno/fs.ts';

export default class Require {
    /**
     * clear module cache
     * @param {string} modulePath
     */
    // static deleteCache(modulePath: string) {
    //     const module: NodeModule = require.cache[modulePath];

    //     if (!module) return;

    //     if (module.parent) {
    //         module.parent.children.splice(module.parent.children.indexOf(module), 1);
    //     }

    //     delete require.cache[modulePath];
    // }

    /**
     * require default or common default
     * @param p module path
     */
    static async default(p: string) {
        /* eslint-disable global-require */
        if(fs.isDir(p)) p += '/index.ts';
        const ex = await import(p);

        return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex;
    }
}
