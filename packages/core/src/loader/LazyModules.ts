import Require from '../utils/Require.ts';

export default class LazyModules {
    static async requireCatch(pName: string) {
        try {
            return await Require.default(pName);
        } catch (err) {
            throw new Error(`Before you use ${pName}, please run "npm i -S ${pName}"\n`);
        }
    }

    static async jsonpBody() {
        return await LazyModules.requireCatch('jsonp-body');
    }

    static async send() {
        return await LazyModules.requireCatch('koa-send');
    }
}
