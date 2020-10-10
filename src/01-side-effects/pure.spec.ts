describe('pure functions', (): void => {
  const range = (n: number, start = 0): number[] =>
    Array(n)
      .fill(0)
      .map((_, i) => i + 1 + start);

  describe('idempotent or referential transparency or pure', (): void => {
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

    it.each(range(10))(
      'all work and no play make Jack a dull boy: %s',
      (_: number) => {
        expect(increment(5)).toEqual(6);
      }
    );
  });
  describe('impure functions', (): void => {
    let counter = 0;
    function incremental(x: number): number {
      // opaque: reaches outside the function
      counter += 1;
      return counter + x;
    }

    it('should return a different result', (): void => {
      let result = incremental(5);
      expect(result).toEqual(6);
      result = incremental(5);
      expect(result).not.toEqual(6);
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
