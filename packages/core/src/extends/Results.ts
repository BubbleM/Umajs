import { CALLBACK_FIELD, VIEW_PATH, DOWNLOAD_PATH } from '../info/UniqueKey.ts';
import { IContext } from '../types/IContext.ts';
import { IResults, TResultStreamData, TResultRedirectData, TResultDownData, TResultViewData, TResultJsonData, TResultJsonpData } from '../types/IResult.ts';
import LazyModules from '../loader/LazyModules.ts';

export const Results: IResults = {
    done() {
    },
    send(ctx: IContext, data: any) {
        return ctx.sendData(data);
    },
    json(ctx: IContext, data: TResultJsonData) {
        return ctx.json(data);
    },
    jsonp(ctx: IContext, data: TResultJsonpData) {
        const { [CALLBACK_FIELD]: callbackField, ...jsonpData } = data;

        return ctx.jsonp(jsonpData, callbackField);
    },
    view(ctx: IContext, data: TResultViewData) {
        const { [VIEW_PATH]: viewPath, ...viewData } = data;

        return ctx.view(viewPath, viewData);
    },
    stream(ctx: IContext, data: TResultStreamData) {
        const { data: streamData, fileName } = data;

        // if (fileName) ctx.attachment(fileName);

        ctx.body = streamData;
    },
    async download(ctx: IContext, data: TResultDownData) {
        // const { [DOWNLOAD_PATH]: downloadPath, ...downloadOpts } = data;

        // if (!ctx.type && !ctx.get('Content-Disposition')) ctx.attachment(downloadPath);

        // return await LazyModules.send(ctx, downloadPath, downloadOpts);
    },
    redirect(ctx: IContext, data: TResultRedirectData) {
        const { url, alt } = data;

        // @ts-ignore
        return ctx.redirect(url, alt);
    },
};
