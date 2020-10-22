// @flow
import isEmpty from 'lodash/fp/isEmpty';
import head from 'lodash/fp/head';
import tail from 'lodash/fp/tail';

export const recursiveSum = (ary:Array<number>): number => (
  isEmpty(ary)
    ? 0
    : head(ary) + recursiveSum(tail(ary))
);

export const tailRecursiveSum = (ary:Array<number>, acc:number = 0): number => (
  isEmpty(ary)
    ? acc
    : tailRecursiveSum(tail(ary), acc + head(ary))
);

const fibRecursive = (nth:number, first:number = 0, second:number = 1):number =>
  nth === 0
    ? first
    : fibRecursive(--nth, second, first + second);

export const fibonacci = (nth:number):number => fibRecursive(nth);

const pow = (x:number, y:number):number =>
  y === 0
    ? 1
    : x * pow(x, y -1);

export const powTail = (x:number, y:number, acc:number=1):number =>
  y === 0
    ? acc
    : powTail(x, y - 1, x * acc);

