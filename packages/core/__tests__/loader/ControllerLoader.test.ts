import { test, assert } from '../../../node-to-deno/test.ts';
import path from '../../../node-to-deno/path.ts';
import ControllerLoader from '../../src/loader/ControllerLoader.ts';
import controllerInfo from '../../src/info/controllerInfo.ts';
import __dirname from '../../../node-to-deno/__dirname.ts';

test({
    name: 'loadControllerDir(dirPath: string)：load controller dir',
    async fn(){
        const basePath = path.join(__dirname(import.meta), '../__fixtures__/loader/controller');

        await ControllerLoader.loadControllerDir(basePath);

        const controllerValues = controllerInfo.getControllersInfo();
        
        const testController = controllerValues.next();

        assert(testController.value !== undefined);
    }
});
