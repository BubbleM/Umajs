// import * as Koa from 'koa';
import { Uma, TUmaOption } from '../../core/src/mod.ts';
import { Router } from '../../router/src/index.ts';
import { __ } from '../../node-to-deno/dirname.ts';

const options: TUmaOption = {
    Router,
    // bodyParser: { multipart: true },
    ROOT: __(import.meta).__dirname,
    configPath: '',
    env: 'development',
};

const uma = Uma.instance(options);

uma.start(8059);

// (async () => {
//     if (process.argv.indexOf('--koa') > -1) {
//         const app = new Koa();

//         app.use(await Uma.middleware(options, app));

//         app.listen(8058);
//     } else {

//         const uma = Uma.instance(options);

//         uma.start(8058);
//     }
// })();
