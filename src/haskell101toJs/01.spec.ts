import { curry } from 'lodash/fp';
import { compose } from 'lodash/fp';

const double = (x: number): number => x + x;

const quadruple = (x: number): number => compose(double, double)(x);

const multiply = (x: number, y: number): number => x * y;

export const range = (
  end: number,
  start: number = 1,
  xs: number[] = []
): number[] =>
  xs.length === end ? xs : range(end, start + 1, xs.concat([start]));

const multipliedRangeFactorial = (n: number): number =>
  range(n).reduce(multiply);

const tailFactorial = (n: number, current = 1): number =>
  n === 1 ? current : tailFactorial(n - 1, current * n);

const add = (a: number, b: number): number => a + b;

const increment = curry(add)(1);

const len = (ns: any[]): number => ns.reduce(increment, 0);

const sum = (ns: number[]): number => ns.reduce(add, 0);

const avg = (ns: number[]): number => sum(ns) / len(ns);

describe('01', () => {
  it('should add', () => {
    expect(add(3, 5)).toEqual(8);
  });
  it('should sum', () => {
    expect(sum([1, 2, 3, 4])).toEqual(10);
  });
  it('should len array of numbers', () => {
    expect(len([1, 2, 3, 4, 5])).toEqual(5);
  });
  it('should len array of strings', () => {
    expect(len(['a', 'b', 'c', 'd'])).toEqual(4);
  });
  it('should avg', () => {
    expect(avg([2, 10])).toEqual(6);
  });
  it('should quadruple a number', () => {
    expect(quadruple(4)).toEqual(16);
  });
  it('should factorial', () => {
    expect(tailFactorial(5)).toEqual(120);
  });
  it('should range', () => {
    expect(range(5)).toEqual([1, 2, 3, 4, 5]);
  });
  it('should factorial with range', () => {
    expect(multipliedRangeFactorial(5)).toEqual(120);
  });
});
