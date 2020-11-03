import { Context } from '../../../node-to-deno/koa.ts';

import { IRequest } from './IRequest.ts';
import { IResponse } from './IResponse.ts';

export interface BaseContext {
    /**
     * 发送内容
     * @param data 内容
     * @param status 状态码
     */
    sendData(data: string, status?: number): void;

    /**
     * 发送json
     * @param data json内容
     */
    json(data: Object): void;

    /**
     * 发送 jsonp
     * @param data json内容
     * @param callbackField 回调字段
     */
    jsonp(data: Object, callbackField?: string): void;

    /**
     * 发送模板
     * @param viewPath 模板地址
     * @param locals 变量
     */
    view(viewPath: string, locals?: any): Promise<any>;

    /**
     * userAgent
     */
    userAgent: string | any;

    /**
     * 路由参数
     */
    param: any;

    /**
     * 请求参数
     */
    query: any;

    /**
     * 设置 header
     * @param name header 名称
     * @param value header 值
     */
    setHeader(name: string | any, value?: string | string[]): void;

    /**
     * 获取 header
     * @param name header 名称
     */
    getHeader(name: string | any): any;

    /**
     * 挂载常用属性
     */
    redirect?: IResponse["redirect"],
    body?: IResponse["body"],
    type?: IResponse["type"],
    status?: IResponse["status"],
    headers?: IRequest["headers"],
    url?: IRequest["url"]
}

export interface IContext extends Context, BaseContext {
    request: IRequest;
    response: IResponse;
}
