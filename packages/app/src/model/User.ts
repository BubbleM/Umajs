import { Resource } from '../../../core/src/mod.ts';

@Resource('Uma', 18)
export default class User {
    constructor(
        readonly name: string,
        readonly age: number,
    ) {}

    getAge() {
        return this.age;
    }
}