import Result from './Result.ts';
import { IContext, BaseContext } from '../types/IContext.ts';
import { IRequest } from '../types/IRequest.ts';
import { IResponse } from '../types/IResponse.ts';

/**
 * controller 自带方法在 ctx 中也有相同实现
 */
export class BaseController implements BaseContext {
    constructor(readonly ctx: IContext) {
        const { request: req, response: res } = ctx;

        this.req = req;
        this.res = res;
        this.request = req;
        this.response = res;
    }

    req: IRequest;

    res: IResponse;

    request: IRequest;

    response: IResponse;

    set status(status: number) {
        this.ctx.response.status = status;
    }

    sendData = Result.send;

    json = Result.json;

    jsonp = Result.jsonp;

    view = async (viewPath: string, locals: { [key: string]: any } = {}) => Result.view(viewPath, locals);

    stream = Result.stream

    download = Result.download

    redirect:any = Result.redirect

    get userAgent() {
        return this.ctx?.headers?.get('user-agent');
    }

    get param() {
        return this.ctx.param;
    }

    get query() {
        return this.ctx.query;
    }

    setHeader(name: string | any, value: string | string[]): void {
        this.ctx.setHeader(name, value);
    }

    getHeader(name: string | any): any {
        return this.ctx.getHeader(name);
    }
}
