// import { curry } from 'lodash/fp';
// import { curryRight } from 'lodash/fp';
// import { map } from 'lodash/fp';
// // import { partial } from 'lodash/fp';

// const myList = ['1', '2', '3'];
// const parseIntBase10 = curryRight(parseInt)(10);
// console.log(parseIntBase10('44'));

// myList.map((x) => parseInt(x, 10));
// map(parseInt)(myList);

// // partial vs currying
// // http://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application
// // Currying takes exactly 1 input, whereas partial application takes 2 (or more) inputs.

// const add = (x: number, y: number): number => x + y;
// // const partialAdd5 = partial(add, 5);
// // partialAdd5(10);

// const curryAdd = curry(add);
// const curryAdd5 = curryAdd(5);
// curryAdd5(20);

// const addy = (x:number) => (y) => x + y;
