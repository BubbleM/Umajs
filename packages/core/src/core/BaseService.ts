import { IContext } from '../types/IContext.ts';

export class BaseService {
    constructor(readonly ctx: IContext) {
    }
}
