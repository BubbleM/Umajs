import { Request } from '../../../node-to-deno/koa.ts';

import { IContext } from './IContext.ts';
import { IResponse } from './IResponse.ts';

interface File {
    size: number;
    path: string;
    name: string;
    type: string;
    lastModifiedDate?: Date;
    hash?: string;

    toJSON(): Object;
}

export interface ContextDelegatedRequest {
    /**
     * Return request header, alias as request.header
     */
    headers?: any;

    /**
     * Get/Set request URL.
     */
    url?: URL;

    /**
     * Get origin of URL.
     */
    origin?: string;

    /**
     * Get/Set request method.
     */
    method?: string;
}
export interface BaseRequest {}

export interface IRequest extends Request, BaseRequest {
    ctx: IContext,
    response: IResponse,
    body: any;
    files?: {[key: string]: File};
}
