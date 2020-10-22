import { RequestMethod } from './RequestMethod.ts';

export type TPathObjArgs = {
    value?: string | string[],
    method?: RequestMethod | RequestMethod[],
};
