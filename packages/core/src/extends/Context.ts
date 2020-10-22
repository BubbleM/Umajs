import Uma from '../core/Uma.ts';
import typeHelper from '../utils/typeHelper.ts';
import { BaseContext, IContext } from '../types/IContext.ts';
import LazyModules from '../loader/LazyModules.ts';

export const Context: BaseContext = {
    get req() {
        return this.request;
    },

    get res() {
        return this.response;
    },

    get request() {
        return this.request;
    },

    get response() {
        return this.response;
    },

    sendData(val: string | ArrayBuffer, status?: number) {
        if (status) this.response.status = status;
        this.response.body = val;
    },

    json(data: Object) {
        this.response.type = 'application/json';
        this.response.body = data;
    },

    jsonp(data: Object, callbackField: string = 'callback') {
        this.response.headers.set('X-Content-Type-Options', 'nosniff');
        this.response.type = 'application/javascript';
        // this.response.body = LazyModules.jsonpBody(data, callbackField, Uma.options.jsonpBody);
    },

    // view(viewPath: string, locals: any = {}) {
    //     locals.ctx = this;

    //     return this.render(viewPath, locals);
    // },

    // get userAgent() {
        // return this.request.headers.get['user-agent'];
    // },

    param: {},

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
        return '';
        // return this.request.headers.get[name];
    },
};
