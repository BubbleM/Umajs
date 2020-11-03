import { Koa, Middleware } from '../../../node-to-deno/koa.ts';
import path from '../../../node-to-deno/path.ts';
import process from '../../../node-to-deno/process.ts';
// import * as http from 'http';
// import * as https from 'https';
// import * as bodyParser from 'koa-body';

import AspectLoader from '../loader/AspectLoader.ts';
import ControllerLoader from '../loader/ControllerLoader.ts';
import ServiceLoader from '../loader/ServiceLoader.ts';
import ResourceLoader from '../loader/ResourceLoader.ts';
import ConfigLoader from '../loader/ConfigLoader.ts';
import PluginLoader from '../loader/PluginLoader.ts';
import controllerInfo from '../info/controllerInfo.ts';
// import { packageInfo } from '../info/packageInfo';

import { Context } from '../extends/Context.ts';
import { Request } from '../extends/Request.ts';
import { Response } from '../extends/Response.ts';
import typeHelper from '../utils/typeHelper.ts';
import mixin from '../utils/mixin.ts';
import { TUmaOption } from '../types/TUmaOption.ts';
import { IContext } from '../types/IContext.ts';
import { TConfig } from '../types/TConfig.ts';
import { TControllerInfo } from '../types/TControllerInfo.ts';
import { TPluginConfig } from '../types/TPluginConfig.ts';
import { ISUmaOption, IUmaOption } from '../types/IUmaOption.ts';
import Delegator from '../../../node-to-deno/delegates.ts';

let instance: Uma | null = null;

export default class Uma {
    private constructor(readonly option: IUmaOption) {
        console.assert(option && option.ROOT !== undefined, `Uma options.ROOT must set value. e.g { ROOT: './src' }, now ${JSON.stringify(option)}`);

        this.options = mixin(true, {
            jsonpBody: {},
            configPath: path.resolve(option.ROOT, 'config'),
            env: process.env('NODE_ENV'),
            strictDir: false,
        }, option);

        const { env, proxy, subdomainOffset } = this.options;

        if (proxy) this.app.proxy = proxy;
        if (subdomainOffset) this.app.subdomainOffset = subdomainOffset;
        this.env = env;
        // process.env.NODE_ENV = this.env;
    }

    config!: TConfig;

    env!: string|undefined;

    app: Koa|any = null;

    options: ISUmaOption;

    // server: http.Server | https.Server;

    routers: string[] = [];

    port!: number;

    callback!: Function;

    private async load() {
        await this.loadConfig();

        await this.loadAspect();

        await this.loadResource();

        if (!this.options.strictDir) {
            await this.loadService();

            await this.loadController();
        }

        await this.loadPlugin();
    }

    async loadConfig() {
        await ConfigLoader.loadConfigDir(this.options.configPath);
        Object.freeze(ConfigLoader.config);
        this.config = ConfigLoader.config;
    }

    async loadAspect() {
        await AspectLoader.loadAspectDir(path.resolve(this.options.ROOT, 'aspect'));
    }

    async loadResource() {
        // ['config', 'aspect', 'plugins'] reserved dir
        const reservedDir = ['config', 'aspect', 'plugins'];

        if (!this.options.strictDir) {
            reservedDir.push('controller', 'service');
        }

        await ResourceLoader.loadResourceDir(this.options.ROOT, reservedDir);
    }

    async loadService() {
        await ServiceLoader.loadServiceDir(path.resolve(this.options.ROOT, 'service'));
    }

    async loadController() {
        await ControllerLoader.loadControllerDir(path.resolve(this.options.ROOT, 'controller'));
    }

    async loadPlugin() {
        // if (this.options.bodyParser) {
            // this.app.use((ctx, next) => {
            //     if (['POST', 'PUT', 'PATCH'].indexOf(ctx.method) > -1) {
            //         const bodyParserOpts = mixin(false, { multipart: true }, this.options.bodyParser);

            //         return Reflect.apply(bodyParser(bodyParserOpts), null, [ctx, next]);
            //     }

            //     return next();
            // });
        // }

        await PluginLoader.loadDir(this.options.ROOT);
    }

    use(mw: Middleware<any, IContext>) {
        this.app.use(mw);
    }

    get context(): IContext {
        return this.app.context;
    }

    async start(port: number = 8058, callback?: Function) {
        if (!this.port) this.port = port;
        if (callback) this.callback = callback;

        const { app, options: { createServer, Router, beforeLoad, afterLoaded } } = this;

        if (typeHelper.isFunction(beforeLoad)) await Promise.resolve(Reflect.apply(beforeLoad, this, [this]));

        await this.load();

        this.use((ctx: IContext, next: Function) => {
            mixin(false, ctx.request, Request);
            mixin(false, ctx.response, Response);
            mixin(false, ctx, Context);

            Delegator.create(ctx, ctx.response)
                .method('redirect')
                .access('status')
                .access('body')
                .access('type')
            Delegator.create(ctx, ctx.request)
                .getter('headers')
                .getter('url')
            return next();
        });

        this.use(Router());

        if (typeHelper.isFunction(afterLoaded)) await Promise.resolve(Reflect.apply(afterLoaded, this, [this]));

        if (createServer) {
            // console.assert(typeHelper.isFunction(createServer), 'config.createServer must be a function');
        }

        // const koaCallback = app.callback();


        // this.server = createServer ? createServer(koaCallback) : app.add(koaCallback);

        // this.server.listen(this.port, async () => {
        //     console.log(`Uma server running at port: ${this.port} `);
        //     console.log(`Uma version: ${packageInfo.version}`);

        //     if (typeof this.callback === 'function') {
        //         await Promise.resolve(Reflect.apply(this.callback, this, []));
        //     }
        // });

        app.addEventListener('listen', () => {
            console.log('Listening on:' + this.port);
        });

        await app.listen({port: this.port})
    }

    static use(mw: Middleware<any, IContext>) {
        Uma.instance().use(mw);
    }

    static get env() {
        return Uma.instance().env;
    }

    static get app() {
        return Uma.instance().app;
    }

    // static get server() {
    //     return Uma.instance().server;
    // }

    static get options() {
        return Uma.instance().options;
    }

    static get config():TConfig {
        return ConfigLoader.config;
    }

    static get pluginConfig(): boolean | TPluginConfig {
        return ConfigLoader.config.plugin;
    }

    static get pluginKeys(): string[] {
        const pluginKeys = [];

        for (const [name, config] of Object.entries(Uma.config.plugin)) {
            if (config === true) {
                pluginKeys.push(name);
            } else if (config === false) {
                continue;
            } else if (config.enable === true) {
                pluginKeys.push(name);
            }
        }

        return pluginKeys;
    }

    static pluginOptions(pluginName: string) {
        const pluginCfg = Uma.config.plugin[pluginName];

        return typeHelper.isBoolean(pluginCfg) ? {} : pluginCfg.options;
    }

    static get context(): IContext {
        return Uma.instance().context;
    }

    /**
     * getControllerInfo()
     */
    static get controllersInfo(): IterableIterator<TControllerInfo> {
        return controllerInfo.getControllersInfo();
    }

    /**
     * Uma instance     eg. Uma.instance({...})
     * Uma getInstance  eg. Uma.instance()
     * @param options Uma options
     */
    static instance(options?: any): Uma {
        if (instance) return instance;

        instance = new Uma(options);
        instance.app = new Koa();

        return instance;
    }

    /**
     * (async () => {
     *     const app = new Koa();
     *     app.use(await Uma.middleware({...}, app));
     * })();
     * @param options Uma options
     * @param app Koa instance
     */
    // static async middleware(options: any, app: Koa): Promise<Koa.Middleware> {
    //     if (instance) throw new Error('Uma can only be instantiated once, app.use(Uma.middleware({...}))');

    //     instance = new Uma(options);
    //     instance.app = <Koa<Koa.DefaultState, IContext>>app;

    //     mixin(false, app.request, Request);
    //     mixin(false, app.response, Response);
    //     mixin(false, app.context, Context);

    //     await instance.load();

    //     return this.options.Router();
    // }
}
