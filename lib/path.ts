/* eslint-disable @typescript-eslint/no-explicit-any */

import { compact, isObject, isUndefined } from 'lodash';

type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type IsTuple<T extends ReadonlyArray<any>> = number extends T['length']
    ? false
    : true;
type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;

/**
 * Helper type for recursively constructing paths through a type.
 * See {@link Path}
 */
type PathImpl<K extends string | number, V> = V extends Primitive
    ? `${K}`
    : `${K}` | `${K}.${Path<V>}`;
/**
 * Type which eagerly collects all paths through a type
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string}}> = 'foo' | 'foo.bar'
 * ```
 */
type Path<T> = T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
        ? {
              [K in TupleKeys<T>]-?: PathImpl<K & string, T[K]>;
          }[TupleKeys<T>]
        : PathImpl<ArrayKey, V>
    : {
          [K in keyof T]-?: PathImpl<K & string, T[K]>;
      }[keyof T];

const isNullOrUndefined = (value: unknown): value is null | undefined =>
    value == null;

function get<T>(obj: T, path: string, defaultValue?: unknown): any {
    if (!path || !isObject(obj)) {
        return defaultValue;
    }

    const result = compact(path.split(/[,[\].]+?/)).reduce(
        (result, key) =>
            // eslint-disable-next-line @typescript-eslint/ban-types
            isNullOrUndefined(result) ? result : result[key as keyof {}],
        obj
    );

    return isUndefined(result) || result === obj
        ? isUndefined(obj[path as keyof T])
            ? defaultValue
            : obj[path as keyof T]
        : result;
}

export type { Path };
export { get };
