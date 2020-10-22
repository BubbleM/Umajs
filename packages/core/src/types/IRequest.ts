import { Request } from '../../../node-to-deno/koa.ts';
// import { Files } from 'formidable';

import { IContext } from './IContext.ts';
import { IResponse } from './IResponse.ts';

export interface BaseRequest {
}

export interface IRequest extends Request, BaseRequest {
    ctx: IContext,
    response: IResponse,
    body: any;
    // files?: Files;
    files?: any,
    query: any
}
