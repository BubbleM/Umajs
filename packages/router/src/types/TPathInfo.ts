import { Key } from '../../../node-to-deno/path-to-regexp.ts';
import { TMethodInfo } from '../../../core/src/mod.ts';

export type TPathInfo = {
    // 文件名
    name?: string,

    // 方法名
    methodName?: string,

    // 路径
    path?: string,

    // class 对象
    clazz?: Function,

    // 方法map
    methodMap?: Map<string, TMethodInfo>;

    // methodPath匹配的param
    keys?: Key[];

    routePath?: string;
};