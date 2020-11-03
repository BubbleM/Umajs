import Uma from '../core/Uma.ts';
import typeHelper from '../utils/typeHelper.ts';
import { BaseContext, IContext } from '../types/IContext.ts';
import LazyModules from '../loader/LazyModules.ts';
import { send } from '../../../node-to-deno/koa.ts';
import Delegator from '../../../node-to-deno/delegates.ts';

export const Context: BaseContext = {
    sendData(val: string | ArrayBuffer, status?: number) {
        if (status) this.status = status;
        this.body = val;
    },

    json(data: Object) {
        this.type = 'application/json';
        this.body = data;
    },

    jsonp(data: Object, callbackField: string = 'callback') {
        // this.set('X-Content-Type-Options', 'nosniff');
        // this.type = 'application/javascript';
        // this.body = LazyModules.jsonpBody(data, callbackField, Uma.options.jsonpBody);
    },

    view(viewPath: string, locals: any = {}) {
        locals.ctx = this;

        // @ts-ignore
        return send(this, viewPath, locals);
    },

    get userAgent() {
        // @ts-ignore
        return this.headers?.get['user-agent'];
    },

    param: {},

    get query() {
        let data:any = {};
        // @ts-ignore
        for (const [key, value] of this?.url?.searchParams) {
            data[key] = value;
        }
        return data;
    },

    setHeader(name: string | { [key: string]: string }, value?: string | string[]): void {
        // const ctx: IContext = this;

        // if (ctx.res.headersSent) {
        //     console.error(new Error(`Cannot set headers after they are sent to the client, url: ${ctx.url}`));

        //     return;
        // }

        // if (typeHelper.isString(name) && value !== undefined) {
            // ctx.response.headers.set(name, value);
        // }

        // if (typeHelper.isObject(name)) {
            // ctx.set(name);
        // }
    },

    getHeader(name: string | any): any {
        // @ts-ignore
        return this.headers?.get[name];
    },
};