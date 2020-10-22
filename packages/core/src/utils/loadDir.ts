import fs from '../../../node-to-deno/fs.ts';
import path from '../../../node-to-deno/path.ts';

/**
 * 加载目录
 * @param dirPath 文件夹地址
 * @param checkFn 加载方法
 */
export default async function loadDir(dirPath: string, loadFn: (filePath: string) => void, ignoreDirs: string[] = []) {
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const filePath = path.resolve(dirPath, file.name);

        if (file.isDirectory) {
            if(ignoreDirs.indexOf(file.name) === -1) {
                await loadDir(filePath, loadFn);
            }
        } else {
            await Promise.resolve(loadFn(filePath));
        }
    }
}
