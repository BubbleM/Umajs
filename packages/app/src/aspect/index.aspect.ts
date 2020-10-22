import { IAspect, IJoinPoint } from '../../../core/src/mod.ts';

import IndexController from '../controller/index.controller.ts';

export default class implements IAspect {
    before(point: IJoinPoint<IndexController>) {
        console.log('index: this is before:', point.target);
    }
}