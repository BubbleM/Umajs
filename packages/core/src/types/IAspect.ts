import Result from '../core/Result.ts';

import { IJoinPoint } from './IJoinPoint.ts';
import { IProceedJoinPoint } from './IProceedJoinPoint.ts';

export interface IAspect {
    before?(point: IJoinPoint): void;
    after?(point: IJoinPoint): void;
    around?(proceedPoint: IProceedJoinPoint): Promise<Result>;
    afterReturning?(point: IJoinPoint, val: any): void;
    afterThrowing?(err: Error): void;
}
