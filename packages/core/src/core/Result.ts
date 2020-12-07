import { CALLBACK_FIELD, VIEW_PATH, DOWNLOAD_PATH } from '../info/UniqueKey.ts';
import { Results } from '../extends/Results.ts';
import { IResult, TResultType } from '../types/IResult.ts';
import { IContext } from '../types/IContext.ts';

export default class Result implements IResult {
    constructor({ type, data, status }: IResult) {
        this.type = type;
        this.data = data;
        this.status = status!;
    }

    type: TResultType;

    data: any;

    status: number;

    static done() {
        return new Result({
            type: 'done',
        });
    }

    static send(data: string | Deno.Buffer, status?: number) {
        return new Result({
            type: 'send',
            data,
            status,
        });
    }

    static json(data: { [key: string]: any }) {
        return new Result({
            type: 'json',
            data,
        });
    }

    static jsonp(data: { [key: string]: any }, callbackField: string = 'callback') {
        return new Result({
            type: 'jsonp',
            data: {
                ...data,
                [CALLBACK_FIELD]: callbackField,
            },
        });
    }

    static view(viewPath: string, locals: { [key: string]: any } = {}) {
        return new Result({
            type: 'view',
            data: {
                ...locals,
                [VIEW_PATH]: viewPath,
            },
        });
    }

    static stream(data: ReadableStream, fileName?: string) {
        return new Result({
            type: 'stream',
            data: {
                data,
                fileName,
            },
        });
    }

    static download(filePath: string, opts?: any) {
        return new Result({
            type: 'download',
            data: {
                ...opts,
                [DOWNLOAD_PATH]: filePath,
            },
        });
    }

    static redirect(url: string, alt?: string) {
        return new Result({
            type: 'redirect',
            data: {
                url,
                alt,
            },
        });
    }

    static finish(ctx: IContext, result: Result) {
        const { type, status, data } = result;

        if (status) ctx.response.status = status;

        return Reflect.get(Results, type)(ctx, data);
    }
}
