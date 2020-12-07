import { curry } from 'lodash/fp';
import { curryRight } from 'lodash/fp';
import { map } from 'lodash/fp';

describe('curry right', () => {
  // Math.pow(base, exponent)
  const sqr = curryRight(Math.pow)(2);
  // Math pow
  const pythagorean = (width: number, height: number) =>
    Math.sqrt(sqr(width) + sqr(height));

  it('should curry one parameter', () => {
    const cPythagorean = curry(pythagorean);

    expect(cPythagorean(3)(4)).toBe(5);
  });
});
describe('add curry and stir', (): void => {
  it('load function from the right most argument', (): void => {
    const myList = ['1', '2', '3'];
    const parseIntBase10 = curryRight(parseInt)(10);
    console.log(parseIntBase10('44'));

    // why fails with [1, 2, 3, NaN, NaN]?
    // const arrayMapStandard = myList.map(parseInt);
    const arrayMapStandard = myList.map((x) => parseInt(x, 10));
    expect(arrayMapStandard).toEqual([1, 2, 3]);
    // why fails with [1, NaN, NaN]?
    // const arrayMap2 = ['1', '2', '3'].map(parseIntBase10);
    const arrayMap2 = ['1', '2', '3'].map((x) => parseIntBase10(x));
    expect(arrayMap2).toEqual([1, 2, 3]);

    const mapParse = map(parseIntBase10);
    expect(mapParse(myList)).toEqual([1, 2, 3]);
  });

  it('es5', (): void => {
    function add(x: number) {
      return function (y: number) {
        return x + y;
      };
    }

    expect(add(2)(2)).toBe(4);
  });

  it('lambda', (): void => {
    const add = (x: number) => (y: number) => x + y;

    const increment = add(1);
    expect(increment(3)).toBe(4);
  });
});
