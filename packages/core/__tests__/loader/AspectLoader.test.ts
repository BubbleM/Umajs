import { test, assert } from '../../../node-to-deno/test.ts';
import path from '../../../node-to-deno/path.ts';
import AspectLoader, { AspectMap } from '../../src/loader/AspectLoader.ts';
import { __ } from '../../../node-to-deno/dirname.ts';

const basePath:string = path.join(__(import.meta).__dirname, '../__fixtures__/loader/aspect');

test({
    name: 'loadAspectDir(dirPath: string)：load aspect dir',
    async fn(){
        await AspectLoader.loadAspectDir(basePath);

        const testAspect = AspectMap.get('test');
        const result = Reflect.construct(<Function>testAspect, []);

        assert(result.before() === 1);
    }
});

test({
    name: 'getAspect(filePath: string)：get aspect',
    async fn(){
        await AspectLoader.loadAspectDir(basePath);

        const testAspect = AspectLoader.getAspect('test');
        const result = Reflect.construct(<Function>testAspect, []);

        assert(result.before() === 1);
    }
});
