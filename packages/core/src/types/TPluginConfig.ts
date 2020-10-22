import { IContext } from './IContext.ts';

export type TPluginConfig = {
    enable?: boolean;
    name?: string;
    packageName?: string;
    path?: string | null;
    type?: 'middleware';
    handler?: (ctx: IContext, next: Function) => void;
    options?: {
        [key: string]: any,
    };
}
