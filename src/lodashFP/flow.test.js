import curry from 'lodash/fp/curry';
import curryRight from 'lodash/fp/curryRight';
import map from 'lodash/fp/map';
// import partial from 'lodash/fp/partial';

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

const curryAdd = curry(add);
const curryAdd5 = curryAdd(5);
curryAdd5(20);

