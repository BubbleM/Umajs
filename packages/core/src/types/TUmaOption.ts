// import { Server, IncomingMessage, ServerResponse } from 'http';
// import { Http2ServerRequest, Http2ServerResponse } from 'http2';
// import * as bodyParser from 'koa-body';
import { Middleware } from '../../../node-to-deno/koa.ts';

import Uma from '../core/Uma.ts';

import { TJsonpBody } from './TJsonpBody.ts';

export type TUmaOption = {
    Router: () => Middleware,
    ROOT: string,
    env?: 'development' | 'production' | string,
    strictDir?: boolean,
    configPath: string,
    proxy?: boolean,
    subdomainOffset?: number,
    jsonpBody?: TJsonpBody,
    bodyParser?: any,
    // createServer?: (cb: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse | Http2ServerResponse) => void) => Server,    createServer?: (cb: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse | Http2ServerResponse) => void) => Server,
    createServer?: any,
    beforeLoad?: (uma: Uma) => void,
    afterLoaded?: (uma: Uma) => void,
}
