import curry from 'lodash/fp/curry';
import partial from 'lodash/fp/partial';
import partialRight from 'lodash/fp/partialRight';

describe('partial application', () => {

  const greet = (greeting, first, last) => (`${greeting}, ${first} ${last}!`);

  describe('partial', () => {
    it('should partially apply from 1st parameter', () => {
      const hiHomer = partial(greet, ['Hi', 'Homer']);
      expect(hiHomer('Simpson'))
        .toEqual('Hi, Homer Simpson!');
    });
  });

  describe('partialRight', () => {
    it('should ', () => {
      const greetHomerSimpson = partialRight(greet, ['Simpson','Homer']);
      expect(greetHomerSimpson('Hi'))
        .toEqual('Hi, Simpson Homer!');
    });
  });

});

describe('partial v2', () => {
  const name = (first, last) => `${first} ${last}`;
  const formalName = (first, last) => `${last}, ${first}`;
  const greet = (greeting, name) => `${greeting} ${name}`;

  it('should use composition', () => {

    expect()
      .toEqual();
  });
});

// partial vs currying
// http://stackoverflow.com/questions/218025/what-is-the-difference-between-currying-and-partial-application
// Currying takes exactly 1 input, whereas partial application takes 2 (or more) inputs.

const add = (x, y) => x + y;
// const partialAdd5 = partial(add, 5);
// partialAdd5(10);

const curryAdd = curry(add);
const curryAdd5 = curryAdd(5);
curryAdd5(20);

