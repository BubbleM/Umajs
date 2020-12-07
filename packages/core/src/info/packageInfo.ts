import path from '../../../node-to-deno/path.ts';
import __dirname from '../../../node-to-deno/__dirname.ts';

const decoder = new TextDecoder("utf-8");
const infos = Deno.readFileSync(path.join(__dirname(import.meta), '../../package.json'));

export const packageInfo:any = JSON.parse(decoder.decode(infos));