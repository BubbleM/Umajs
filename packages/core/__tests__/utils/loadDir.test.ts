import { test, assert } from '../../../node-to-deno/test.ts';
import path from '../../../node-to-deno/path.ts';
import loadDir from '../../src/utils/loadDir.ts';

const baseDir = path.join(Deno.cwd(), '__tests__/__fixtures__/loadDir');

test({
    name: 'loadDir(dirPath, loadFn, ignoreDirs)：load dir not exist should return void',
    async fn(){
        const result = await loadDir(path.join(baseDir, 'aa'), () => {});

        assert(result === undefined);
    }
});

test({
    name: 'loadDir(dirPath, loadFn, ignoreDirs)：load dir with ignoreDirs',
    async fn(){
        const loadDirAsync = (dir: string, ignore: string[]): Promise<string[]> => new Promise(resolve => {
            let timer:any = null;
            const files:string[] = [];

            loadDir(dir, (filePath) => {
                clearTimeout(timer);
                timer = null;

                files.push(filePath);

                timer = setTimeout(() => {
                    resolve(files);
                }, 200);
            }, ignore);
        });

        const result = await loadDirAsync(baseDir, ['dir']);

        assert(result.length === 1);
        assert(result[0].indexOf('dir2') < 0);
    }
});

