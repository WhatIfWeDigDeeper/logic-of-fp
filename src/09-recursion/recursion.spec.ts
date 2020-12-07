// import { isEmpty } from 'lodash/fp';
// import { head } from 'lodash/fp';
// import { tail } from 'lodash/fp';

// see https://2ality.com/2015/06/tail-call-optimization.html

export const recursiveSum = (ary: Array<number>): number =>
  isEmpty(ary) ? 0 : head(ary) + recursiveSum(tail(ary));

export const tailRecursiveSum = (ary: Array<number>, acc: number = 0): number =>
  isEmpty(ary) ? acc : tailRecursiveSum(tail(ary), acc + head(ary)!);

const isEmpty = <T>(ary: T[]): boolean => ary == null || ary.length === 0;
const head = <T>(ary: T[]): T => ary.slice(0, 1)[0];
const tail = <T>(ary: T[]): T[] => ary.slice(1);

describe('recursion', (): void => {
  describe('recursion', (): void => {
    describe('recursion', (): void => {
      const numbers = range(10);
      it('should recursively sum numbers', (): void => {
        const result = recursiveSum(numbers);
        expect(result).toBe(55);
      });
      it('should sum numbers with tail recursion', (): void => {
        const result = tailRecursiveSum(numbers);
        expect(result).toBe(55);
      });
    });
  });
});

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

const _rangeRecurse = (
  count: number,
  start: number = 1,
  ary: Array<number> = [],
  i: number = 0
): Array<number> => {
  if (ary.length === count) {
    return ary;
  }
  return _rangeRecurse(count, start, [...ary, i + start], i + 1);
};

const range = (count: number, start: number = 1): Array<number> =>
  _rangeRecurse(count, start, [], 0);

const _rangeReverse = (
  ary: Array<number> = [],
  i: number,
  start: number = 0
): Array<number> => {
  if (i <= start) {
    return ary;
  }
  return _rangeReverse([i - 1, ...ary], i - 1, start);
};

const rangeRev = (count: number, start: number = 1): Array<number> =>
  _rangeReverse([], count + start, start);

// trampoline, stack
describe('recursion vs. tail recursion', () => {
  it('should create range', () => {
    expect(range(5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(3, 10)).toEqual([10, 11, 12]);
  });

  it('should create range in reverse', () => {
    expect(rangeRev(5)).toEqual([1, 2, 3, 4, 5]);

    expect(rangeRev(3, 10)).toEqual([10, 11, 12]);
  });

  // it('should test performance', () => {
  //   const max = 1000;
  //   let begin = Date.now();
  //   for(let i = 0; i < max; i += 1){
  //     rangeRev(100);
  //   }
  //   let end = Date.now();
  //   console.log(`call to rangeRev took ${end - begin} milliseconds`);
  //
  //   let begin2 = Date.now();
  //   for(let i = 0; i < max; i += 1){
  //     range(100);
  //   }
  //   let end2 = Date.now();
  //   console.log(`call to range took ${end2 - begin2} milliseconds`);
  //
  // });
});
