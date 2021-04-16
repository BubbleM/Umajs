import * as path from 'path';
import * as Koa from 'koa';
import * as chokidar from 'chokidar';
import Log from '../utils/log';
import Require from '../utils/Require';

import { Uma } from '../index';

const log = new Log();
const loadMethods = {
};

/**
 * HMR or reload in development
 * @param {Uma} uma
 */
export default function reload() {
    const uma: Uma = Uma.instance();
    const { ROOT } = uma.options;
    const watcher: chokidar.FSWatcher = chokidar.watch(ROOT, { ignoreInitial: true });

    watcher.on('change', (p: string) => {
        /* eslint-disable-next-line */
        const fileInfo: RegExpMatchArray = path.basename(p).match(new RegExp(`.*\.(${Object.keys(loadMethods).join('|')})\.`));
        const fileType: string = fileInfo
            ? fileInfo[1]
            : null;

        if (fileType) {
            Require.deleteCache(p);
            loadMethods[fileType](p, uma);
            log.info('Hot Update: %s has been modified', p);
        } else if (path.basename(p).match(/^app\./)) {
            log.warn('Manual Restart To Update: %s has been modified', p);
        } else {
            uma.server.close();
            uma.app = new Koa();
            uma.start();
            log.info('Restart: %s has been modified', p);
        }
    });

    watcher.on('error', (e: Error) => {
        log.error(e.toString());
    });
}
