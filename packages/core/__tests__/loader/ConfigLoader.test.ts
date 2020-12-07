import { test, assertEquals } from '../../../node-to-deno/test.ts';
import path from '../../../node-to-deno/path.ts';
import ConfigLoader from '../../src/loader/ConfigLoader.ts';
import __dirname from '../../../node-to-deno/__dirname.ts';

test({
    name: 'loadConfigDir(dirPath: string)：load config dir',
    async fn(){
        const basePath = path.join(__dirname(import.meta), '../__fixtures__/loader/config');

        await ConfigLoader.loadConfigDir(basePath);

        assertEquals(JSON.stringify(ConfigLoader.config), JSON.stringify({
            plugin: {},
            online: {
                name: 'onlineConfig'
            },
            default: {
                name: 'defaultConfig'
            }
        }));
    },
});