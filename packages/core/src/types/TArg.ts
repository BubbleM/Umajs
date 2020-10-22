import { IContext } from './IContext.ts';

export type TArg = {
    argKey: string | undefined,
    argIndex: number | undefined,
    argDecorator?: (data: string, ctx: IContext) => any,
}
