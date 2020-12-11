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

  function addThree(x: number) {
    return function (y: number) {
      return function (z: number) {
        return x + y + z;
      };
    };
  }

  it('should add 3 the old fashioned way', (): void => {
    const addTwo = addThree(8);
    const addOne = addTwo(16);
    const result = addOne(32);

    expect(result).toBe(56);
  });

  describe('es6', (): void => {
    const addThree = (x: number) => (y: number) => (z: number) => x + y + z;

    it('should add 3 with es6 lambda functions', (): void => {
      const addTwo: (y: number) => (z: number) => number = addThree(8);
      const addOne: (z: number) => number = addTwo(16);
      const result: number = addOne(32);

      expect(result).toBe(56);
    });

    it('should provide a slightly more realistic example', (): void => {
      const add = (x: number) => (y: number) => x + y;

      const increment = add(1);

      expect(increment(3)).toBe(4);
    });

    it('should use lodash curry function to auto-convert to a function creator', (): void => {
      const standardAdd = (x: number, y: number) => x + y;
      const createFns = curry;

      const add = createFns(standardAdd);

      const increment = add(1);

      expect(increment(3)).toBe(4);
    });
  });
});

describe.only('Trade Offs', (): void => {
  const sleepTimeout = 10000;
  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const add = (x: number, y: number) => x + y;
  describe('Advantages', (): void => {
    it('more reusable', (): void => {
      expect(add(2, 4)).toBe(6);
    });

    it('easier to test', (): void => {
      expect(add(2, 4)).toBe(6);
    });

    it('less bugs from mutating state', (): void => {
      expect(add(2, 4)).toBe(6);
    });

    it('parallel', (): void => {
      expect(add(2, 4)).toBe(6);
    });

    it('human readable', (): void => {
      expect(add(2, 4)).toBe(6);
    });

    it('easier to understand', (): void => {
      expect(add(2, 4)).toBe(6);
    });

    it('easier to change', (): void => {
      expect(add(2, 4)).toBe(6);
    });

    it('∴ LESS COMPLEXITY', (): void => {
      expect(add(2, 4)).toBe(6);
    });
  });
  describe('Disadvantages', (): void => {
    it('many small functions', (): void => {
      expect(add(2, 4)).toBe(8);
    });

    it('super spreader: pure fn, maybe/either', (): void => {
      expect(add(2, 4)).toBe(8);
    });

    it('performance', async (): Promise<void> => {
      await sleep(sleepTimeout);
      expect(add(2, 4)).toBe(8);
    });

    it('complicated IO', (): void => {
      expect(add(2, 4)).toBe(8);
    });

    it('STEEP LEARNING CURVE', (): void => {
      expect(add(2, 4)).toBe(8);
    });
  });
});
