import compose from 'lodash/fp/compose';
// import curry from 'lodash/fp/curry';
import curryRight from 'lodash/fp/curryRight';
import flow from "lodash/fp/flow";
import filter from 'lodash/fp/filter';
// import identity from 'lodash/fp/identity';
import map from 'lodash/fp/map';
// import partial from 'lodash/fp/partial';
import reduce from 'lodash/fp/reduce';

import * as Immutable from "immutable";

const myList = ['1','2','3'];
const parseIntBase10 = curryRight(parseInt)(10);
console.log(parseIntBase10('44'));

myList.map(x => parseInt(x,10));
map(myList, parseInt);
map(parseInt)(myList);


// partial vs currying
// http://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application
// Currying takes exactly 1 input, whereas partial application takes 2 (or more) inputs.

const add = (x, y) => x + y;
// const partialAdd5 = partial(add, 5);
// partialAdd5(10);
//
// const curryAdd = curry(add);
// const curryAdd5 = curryAdd(5);
// curryAdd5(20);
//
//
// const printToConsole = str => {
//   console.log(str);
//   return str;
// };
// const toUpperCase = str => str.toUpperCase();
// const echo = identity;
//
// const printMessage = compose(
//                         printToConsole,
//                         toUpperCase,
//                         echo);

// move to composition.
describe('Immutable vs. Lodash/FP', () => {
// from https://jsperf.com/lodash-fp-vs-immutable-js

  const xs: Array<number> = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  it('should run Immutable.List', () => {
    const actual: number = Immutable.List(xs)
      .map(x => x * 2)
      .filter(x => x > 0)
      .reduce((r, x) => r + x, 0);
    expect(actual).toEqual(30);
  });

  const double = (x: number): number => x * 2;
  const positive = (x: number): boolean => x > 0;

  it('should show declarative', () => {
    const actual: number = Immutable.List(xs)
      .map(double)
      .filter(positive)
      .reduce(add);
    expect(actual).toEqual(30);
  });

  it('should run Lodash/fp flow', () => {
    const actual: number = flow(
      map(x => x * 2),
      filter(x => x > 0),
      reduce((acc, x) => acc + x, 0)
    )(xs);

    expect(actual).toEqual(30);
  });

  const sum = (xs) => reduce(add, 0)(xs);

  it('declarative version run Lodash/fp flow', () => {
    const actual: number = flow(
      map(double),
      filter(positive),
      sum
    )(xs);

    expect(actual).toEqual(30);
  });

  it('should use lodash/fp/compose', () => {
    const actual: number = compose(
      sum,
      filter(positive),
      map(double)
    )(xs);

    expect(actual).toEqual(30);
  });

  const positiveDoubleSumTotal = (xs) => compose(
    sum,
    filter(positive),
    map(double)
  )(xs);

  it('should use composed function', () => {
    expect(positiveDoubleSumTotal(xs)).toEqual(30);
  });

});
