import { diff } from '../src';

describe('diff', () => {
    beforeEach(() => {});
    test('object', () => {
        expect(diff({}, {})).toStrictEqual({});
        expect(diff({}, { a: 1 })).toStrictEqual({});
        expect(diff({ a: 2 }, { a: 1 })).toStrictEqual({ a: 2 });
        expect(diff({ a: 2 }, { a: { b: 2 } })).toStrictEqual({ a: 2 });
        expect(diff({ a: { b: 2 } }, { a: 2 })).toStrictEqual({ a: { b: 2 } });
        expect(diff({ a: { b: 2 } }, { a: { b: 1 } })).toStrictEqual({ 'a.b': 2 });
        expect(
            diff(
                {
                    a: 1,
                    b: 2,
                    c: 'str',
                    d: { e: [2, { a: 4 }, 5] },
                    f: true,
                    h: [1],
                    g: { a: [1, 2], j: 111 }
                },
                {
                    a: [],
                    b: 'aa',
                    c: 3,
                    d: { e: [3, { a: 3 }] },
                    f: false,
                    h: [1, 2],
                    g: { a: [1, 1, 1], i: 'delete' },
                    k: 'del'
                }
            )
        ).toStrictEqual({
            a: 1,
            b: 2,
            c: 'str',
            'd.e[0]': 2,
            'd.e[1].a': 4,
            'd.e[2]': 5,
            f: true,
            g: {
                a: [1, 2],
                j: 111
            },
            h: [1]
        });
        expect(
            diff(
                { a: 10, c: { d: [1, 2], e: { f: 'hello', g: { h: 11 } } }, i: false },
                { a: 1, b: 2, c: { d: [1, 2, 3], e: { f: 'hello', g: { h: 3 } } }, i: true }
            )
        ).toStrictEqual({
            a: 10,
            'c.d': [1, 2],
            'c.e.g.h': 11,
            i: false
        });

        expect(
            diff(
                {
                    a: 1,
                    c: { d: [1, 'test1', false], e: { f: 'hello world', g: { h: 3 } } },
                    i: ['a', 'b']
                },
                { a: 1, b: 2, c: { d: [1, 'test', false], e: { f: 'hello', g: { h: 3 } } } }
            )
        ).toStrictEqual({
            'c.d[1]': 'test1',
            'c.e.f': 'hello world',
            i: ['a', 'b']
        });
    });
});
