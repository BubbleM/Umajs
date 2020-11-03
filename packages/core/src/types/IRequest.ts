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

export interface BaseRequest {
}

export interface IRequest extends Request, BaseRequest {
    ctx: IContext,
    response: IResponse,
    body: any;
    files?: {[key: string]: File};
}
