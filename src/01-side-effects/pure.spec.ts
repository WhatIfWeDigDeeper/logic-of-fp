describe('pure vs impure functions', (): void => {
  const range = (n: number, start = 0): number[] =>
    Array(n)
      .fill(0)
      .map((_, i) => i + 1 + start);

  describe('idempotent or referential transparency or pure', (): void => {
    let counter = 0;
    function incremental(x: number): number {
      // reaches outside the function
      counter += 1;
      return counter + x;
    }

    it('will return a different result with the same input', (): void => {
      let result = incremental(5);
      expect(result).toEqual(6);
      result = incremental(5);
      expect(result).not.toEqual(6);
    });

    const increment = (x: number): number => x + 1;

    it('should return the same result for the same input', (): void => {
      let result = increment(5);
      expect(result).toEqual(6);
      result = increment(5);
      expect(result).toEqual(6);
    });

    it.each(range(100))(
      'is insanity to do the same thing 100x and expect a different result: %s',
      (_: number) => {
        expect(increment(5)).toEqual(6);
      }
    );
    // TODO: choose one
    it.each(range(10))(
      'all work and no play make Jack a dull boy: %s',
      (_: number) => {
        expect(increment(5)).toEqual(6);
      }
    );
  });

  describe('slice vs splice', (): void => {
    it('will modify the array with splice', (): void => {
      const ary = [1, 2, 3, 4];
      const subset = ary.splice(0, 2);
      expect(subset).toEqual([1, 2]);
      expect(ary.length).toBe(2);
    });
    it('should not modify array with slice', (): void => {
      const ary = [1, 2, 3, 4];
      const subset = ary.slice(0, 2);
      expect(subset).toEqual([1, 2]);
      expect(ary.length).toBe(4);
    });
  });

  describe('sort v sort', (): void => {
    it('will modify the array with sort', (): void => {
      const ary = [3, 1, 2];
      const sortedAry = ary.sort();
      expect(sortedAry).toEqual([1, 2, 3]);
      expect(ary).toEqual([1, 2, 3]);
    });
    it('should not modify the array when a new shallow array is sorted', (): void => {
      const ary = [3, 1, 2];
      const sortedAry = ary.slice().sort();
      expect(sortedAry).toEqual([1, 2, 3]);
      expect(ary).toEqual([3, 1, 2]);
    });
  });

  describe('parameters', (): void => {
    type Counter = { count: number };

    const incrementImpure = (input: Counter): Counter => {
      input.count++;
      return input;
    };

    const incrementPure = (input: Counter): Counter => ({
      count: input.count + 1,
    });

    it('will not modify the original input', (): void => {
      const input = { count: 0 };
      const result = incrementImpure(input);
      expect(result.count).toBe(1);
      expect(input.count).toBe(1);
    });
    it('should not modify the original input', (): void => {
      const input = { count: 0 };
      const result = incrementPure(input);
      expect(result.count).toBe(1);
      expect(input.count).toBe(0);
    });
  });
});

// property assertion testing
// const jsc = require('jsverify');
// see WhenUpdatingPricesTests.ts in v2 api
// it('should getUpdatedPricing with combinatorial tests', () => {
//   const positiveNumber = jsc.number(0.01, 999999.99);
//   const nullValue = jsc.constant(null);
//   expect(
//     jsc.check(
//       jsc.forall(
//         // cart
//         positiveNumber,
//         jsc.oneof([positiveNumber, nullValue]),
//         jsc.oneof([positiveNumber, nullValue]),
//         jsc.oneof([positiveNumber, nullValue]),
//         // repo
//         positiveNumber,
//         jsc.oneof([positiveNumber, nullValue]),
//         jsc.oneof([positiveNumber, nullValue]),
//         jsc.oneof([positiveNumber, nullValue]),
//         (
//           list: any,
//           sale: any,
//           pvList: any,
//           pvSale: any,
//           rList: any,
//           rSale: any,
//           rpvList: any,
//           rpvSale: any
//         ) => {
//           const cartItemProduct = createItemProduct(list, sale, pvList, pvSale);
//           const repoItemProduct = createItemProduct(
//             rList,
//             rSale,
//             rpvList,
//             rpvSale
//           );
//           const actual = getUpdatedPricing(cartItemProduct, repoItemProduct);
//           // precedence order.
//           return (
//             actual.pricing.listPrice === rpvList ||
//             actual.pricing.listPrice === rList ||
//             actual.pricing.listPrice === pvList ||
//             actual.pricing.listPrice === list
//           );
//         }
//       )
//     ),
//     { rngState: '143e9c5f037a8c37b2' } as any
//   ).equals(true);
// });
