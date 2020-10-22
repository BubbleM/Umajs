import { Response } from '../../../node-to-deno/koa.ts';

import { IContext } from './IContext.ts';
import { IRequest } from './IRequest.ts';

export interface BaseResponse {}

export interface IResponse extends Response, BaseResponse {
    ctx: IContext;
    request: IRequest;
}
