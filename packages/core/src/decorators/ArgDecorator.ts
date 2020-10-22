import controllerInfo from '../info/controllerInfo.ts';
import { TParameterDecorator } from '../types/TDecorator.ts';
import { IContext } from '../types/IContext.ts';

/**
 * 自定义参数装饰器
 * @param fn (data: string, ctx: IContext) => any
 */
export function createArgDecorator(fn: (data: string, ctx: IContext) => any): ((argKey?: string) => TParameterDecorator) {
    return (argKey: string | undefined) => (target: any, propertyKey: string, argIndex: number) => {
        controllerInfo.setControllersInfo(target.constructor, propertyKey, {
            argKey,
            argIndex,
            argDecorator: fn,
        });
    };
}

/**
 * param 装饰器
 */
export const Param = createArgDecorator((argKey, ctx: IContext) => ctx.param[argKey]);

/**
 * query 装饰器
 */
export const Query = createArgDecorator((argKey, ctx: IContext) => {
    for (const [key, value] of ctx.request.url.searchParams) {
        if(key === argKey) return value;
    }
});

/**
 * context 装饰器
 */
export const Context = createArgDecorator((_, ctx: IContext) => ctx);
