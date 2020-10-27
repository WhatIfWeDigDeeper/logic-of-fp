import { isEmpty } from 'lodash/fp';
import { head } from 'lodash/fp';
import { tail } from 'lodash/fp';

// see https://2ality.com/2015/06/tail-call-optimization.html

export const recursiveSum = (ary: Array<number>): number =>
  isEmpty(ary) ? 0 : head(ary)! + recursiveSum(tail(ary));

export const tailRecursiveSum = (ary: Array<number>, acc: number = 0): number =>
  isEmpty(ary) ? acc : tailRecursiveSum(tail(ary), acc + head(ary)!);

const fibRecursive = (
  nth: number,
  first: number = 0,
  second: number = 1
): number => (nth === 0 ? first : fibRecursive(--nth, second, first + second));

export const fibonacci = (nth: number): number => fibRecursive(nth);

const fibTrampoline = (
  nth: number,
  first: number = 0,
  second: number = 1
): number | ((n: number, first: number, second: number) => any) =>
  nth === 0 ? first : () => fibTrampoline(--nth, second, first + second);

// adapted from
// https://stackoverflow.com/a/54719630/753279
const trampoline = (
  fn: (...args: any[]) => unknown | ((...args: any[]) => unknown)
) => (...args: unknown[]) => {
  let result = fn(...args);
  //repeatedly call the function till you hit your base case
  while (typeof result === 'function') {
    result = result();
  }
  return result;
};

const pow = (x: number, y: number): number => (y === 0 ? 1 : x * pow(x, y - 1));

export const powTail = (x: number, y: number, acc: number = 1): number =>
  y === 0 ? acc : powTail(x, y - 1, x * acc);

describe('trampoline', (): void => {
  it('should ', (): void => {
    const fib = trampoline(fibTrampoline);
    const result = fib(6);
    expect(result).toBe(8);
  });
});
