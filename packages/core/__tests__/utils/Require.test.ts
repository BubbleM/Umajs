import { test, assert } from '../../../node-to-deno/test.ts';
import path from '../../../node-to-deno/path.ts';
import Require from '../../src/utils/Require.ts';
import __dirname from '../../../node-to-deno/__dirname.ts';

const baseDir = path.join(__dirname(import.meta), '__tests__/__fixtures__/requireDefault');

test({
    name: 'default(p: string): any：should return default obj',
    async fn(){
        const loadObj = await Require.default(path.join(baseDir, 'Object.ts'));

        assert(loadObj.a === 1);
    }
});

test({
    name: 'default(p: string): any：should return default function',
    async fn(){
        const loadFunc = await Require.default(path.join(baseDir, 'Function.ts'));

        assert(loadFunc() === 'abc');
    }
});

test({
    name: 'default(p: string): any：should return default module',
    async fn(){
        const loadModule = await Require.default(path.join(baseDir, 'Module.ts'));

        assert(loadModule.a === 1);
    }
});

test({
    name: 'default(p: string): any：load file with not default',
    async fn(){
        const loadNodefault = await Require.default(path.join(baseDir, 'Nodefault.ts'));

        assert(loadNodefault.a === 1);
    }
});
