import { IJoinPoint } from './IJoinPoint.ts';

export interface IProceedJoinPoint<T = any> extends IJoinPoint<T> {
    proceed(...props: any[]): Promise<any>;
}
