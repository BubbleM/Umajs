import { test, assert, assertEquals } from '../../../node-to-deno/test.ts';
import path from '../../../node-to-deno/path.ts';
import mixin from '../../src/utils/mixin.ts';

test({
    name: 'mixin(deep: boolean = false, target: any, ...sources: any[])：target is not object, return target',
    fn(){
        const result = mixin(false, 1);

        assert(result === 1);
    }
});

test({
    name: 'mixin(deep: boolean = false, target: any, ...sources: any[])：not deep mixin',
    fn(){
        const target = {
            one: 't1',
            two: {
                one: {
                    one: 't1-2-1-1',
                    two: 't1-2-1-2',
                },
            },
        };
        const source = {
            one: 's1-1',
            two: {
                one: {
                    one: 's1-2-1-1',
                },
            },
        };

        mixin(false, target, source);

        assert(target.one === 's1-1');
        assert(target.two.one.one === 's1-2-1-1');
        assert(target.two.one.two === undefined);

        source.two.one.one = 'aaa';
        assertEquals(target.two.one.one, 'aaa');
    }
});

test({
    name: 'mixin(deep: boolean = false, target: any, ...sources: any[])：deep mixin',
    fn(){
        const target = {
            one: 't1',
            two: {
                one: {
                    one: 't1-2-1-1',
                    two: 't1-2-1-2',
                },
            },
        };
        const source = {
            one: 's1-1',
            two: {
                one: {
                    one: 's1-2-1-1',
                },
            },
        };

        mixin(true, target, source);

        assert(target.one === 's1-1');
        assert(target.two.one.one === 's1-2-1-1');
        assert(target.two.one.two === 't1-2-1-2');

        source.two.one.one = 'aaa';
        assertEquals(target.two.one.one, 's1-2-1-1');
    }
});

test({
    name: 'mixin(deep: boolean = false, target: any, ...sources: any[])：mixin get',
    fn(){
        const target = {
            one: 'one',
        };
        const source = {
            get one() {
                return 'aaa';
            },
        };

        mixin(true, target, source);

        assert(target.one === 'aaa');
    }
});

test({
    name: 'mixin(deep: boolean = false, target: any, ...sources: any[])：mixin set',
    fn(){
        const target = {
            one: 'one',
            two: '',
        };
        const source:any = {
            set one(val: string) {
                this.two = val + 'hhh';
            },
        };

        mixin(true, target, source);

        target.one = 'test';

        assert(target.two === 'testhhh');
    }
});
