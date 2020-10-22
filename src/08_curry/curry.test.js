import curry from 'lodash/fp/curry';
import curryRight from 'lodash/fp/curryRight'
import map from 'lodash/fp/map';

describe('curry', () => {

  // Math.pow(base, exponent)
  const sqr = curryRight(Math.pow)(2);

  it('should curry one parameter', () => {

    // Math pow
    const pythagorean = (width, height) => (
      Math.sqrt(sqr(width) + sqr(height))
    );
    const cPythagorean = curry(pythagorean);

    expect(cPythagorean(3)(4))
      .toBe(5);
  });
});


const myList = ['1','2','3'];
const parseIntBase10 = curryRight(parseInt)(10);
console.log(parseIntBase10('44'));

myList.map(x => parseInt(x,10));
myList.map(parseIntBase10);
map(myList, parseIntBase10);
map(parseIntBase10)(myList);
