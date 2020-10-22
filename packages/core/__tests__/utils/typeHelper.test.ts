import { test, assert } from '../../../node-to-deno/test.ts';
import typeHelper from '../../src/utils/typeHelper.ts';

test({
    name: 'type(target: any): string：variable type',
    async fn(){
        const typeList:any = {
            String: typeHelper.type('test'),
            Number: typeHelper.type(1),
            Array: typeHelper.type([1]),
            Object: typeHelper.type({}),
            Function: typeHelper.type(() => {}),
            Null: typeHelper.type(null),
            Undefined: typeHelper.type(undefined),
            Map: typeHelper.type(new Map()),
            Symbol: typeHelper.type(Symbol('a')),
        };

        for (let i in typeList) {
            assert(i === typeList[i]);
        }
    }
});

test({
    name: 'undef(): undefined：should return undefined',
    async fn(){
        const result = typeHelper.undef;

        assert(result === undefined);
    }
});

test({
    name: 'isUndef(obj: any): boolean: string is not undefined',
    async fn(){
        const result = typeHelper.isUndef('a');

        assert(result === false);
    }
});

test({
    name: 'isUndef(obj: any): boolean: undefined is undefined',
    async fn(){
        const result = typeHelper.isUndef(typeHelper.undef);

        assert(result === true);
    }
});

test({
    name: 'isString(target: any): boolean: 1 is not string => ',
    async fn(){
        const result = typeHelper.isString(1);

        assert(result === false);
    }
});

test({
    name: 'isString(target: any): boolean: a is string => ',
    async fn(){
        const result = typeHelper.isString('a');

        assert(result === true);
    }
});

test({
    name: 'isObject(target: any): boolean：a is not object => ',
    async fn(){
        const result = typeHelper.isObject(['a']);
        const isObj2 = typeHelper.isObject({});

        assert(result === false);
        assert(isObj2 === true);
    }
});

test({
    name: 'isObject(target: any): boolean：{} is object => ',
    async fn(){
        const result = typeHelper.isObject({});

        assert(result === true);
    }
});

test({
    name: 'isFunction(target: any): boolean：[1] is not function',
    async fn(){
        const result = typeHelper.isFunction([1]);

        assert(result === false);
    }
});

test({
    name: 'isFunction(target: any): boolean：() => {} is function',
    async fn(){
        const result = typeHelper.isFunction(() => {});

        assert(result === true);
    }
});

test({
    name: 'isFunction(target: any): boolean：function () {} is function',
    async fn(){
        const result = typeHelper.isFunction(function () {});

        assert(result === true);
    }
});

test({
    name: 'isBoolean(target: any): boolean：null is not boolean',
    async fn(){
        const result = typeHelper.isBoolean(null);

        assert(result === false);
    }
});

test({
    name: 'isBoolean(target: any): boolean：true is boolean',
    async fn(){
        const result = typeHelper.isBoolean(true);

        assert(result === true);
    }
});

test({
    name: 'isBoolean(target: any): boolean：false is boolean',
    async fn(){
        const result = typeHelper.isBoolean(false);

        assert(result === true);
    }
});

test({
    name: 'isArray(target: any): boolean：{} is not array',
    async fn(){
        const result = typeHelper.isArray({});

        assert(result === false);
    }
});

test({
    name: 'isArray(target: any): boolean：[] is array',
    async fn(){
        const result = typeHelper.isArray([]);

        assert(result === true);
    }
});

test({
    name: 'isArray(target: any): boolean：new Array(1) is array',
    async fn(){
        const result = typeHelper.isArray(new Array(1));

        assert(result === true);
    }
});
