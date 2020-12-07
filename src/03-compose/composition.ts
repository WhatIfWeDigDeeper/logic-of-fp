import { compose, map, pipe } from 'lodash/fp';

// import { LineItem, Product, Price } from '../types';
import { LineItem, Product } from '../types';

// interface PriceSavings {
//   offerPrice: number;
//   savings: number;
// }

// const getPriceSavings = (price: Readonly<Price>): PriceSavings =>
//   price.sale !== undefined
//     ?  { offerPrice: price.sale, savings: price.list - price.sale }
//     : { offerPrice: price.list, savings: 0 };

const getOfferPrice = (product: Readonly<Product>): number =>
  product.price.sale !== undefined ? product.price.sale : product.price.list;

const add = (a: number, b: number) => a + b;

const sum = (ns: number[]) => ns.reduce(add, 0);
const getOfferPrices = (products: readonly Product[]): number[] =>
  products.map(getOfferPrice);

const products: Product[] = [
  {
    name: 'Baby Yoda',
    price: {
      list: 40,
      sale: 39.99,
    },
  },
  {
    name: 'DO NOT Tickle me Elmo',
    price: {
      list: 29.95,
      sale: 0.99,
    },
  },
];

describe('pipe or flow', () => {
  it('should use map reduce', () => {
    const subtotal = products
      .map((product) =>
        product.price.sale !== undefined &&
        product.price.sale < product.price.list
          ? product.price.sale
          : product.price.list
      )
      .reduce((acc, offerPrice) => acc + offerPrice, 0);

    expect(subtotal).toEqual(115);
  });

  it('should use getOfferPrice and remove anonymous lambdas', () => {
    const subtotal = products.map(getOfferPrice).reduce(add, 0);

    expect(subtotal).toEqual(115);
  });

  it('should compose and calculate charge amount', () => {
    const subtotal = pipe(getOfferPrices, sum)(products);
    expect(subtotal).toEqual(115);
  });

  it('should compose and calculate charge amount', () => {
    const calculateSubtotal = pipe(getOfferPrices, sum);

    expect(calculateSubtotal(products)).toEqual(115);
  });

  it('should compose and calculate charge amount', () => {
    const subtotal = compose(sum, getOfferPrices)(products);
    expect(subtotal).toEqual(115);
  });
});

describe('line items', () => {
  const lineItems: LineItem[] = [
    {
      quantity: 2,
      item: {
        name: 'Baby Yoda',
        price: {
          list: 40,
          sale: 39.99,
        },
      },
    },
    {
      quantity: 1,
      item: {
        name: 'DO NOT Tickle me Elmo!',
        price: {
          list: 29.95,
          sale: 0.99,
        },
      },
    },
  ];

  // const sum = (ns: number[]): number => ns.reduce(add, 0);

  // const getOfferPrices = (products: readonly Product[]): number[] =>
  //   products.map(getOfferPrice);

  // const getTotal = (prices: number[]): number =>
  //   prices.reduce((acc, item) => acc + item, 0);

  const getLineItemOfferPrice = (lineItem: LineItem): number =>
    lineItem.quantity * getOfferPrice(lineItem.item);

  it('should calculate total using array methods', (): void => {
    const total = lineItems.map(getLineItemOfferPrice);
    const expectedTotal = 39.99 * 2 + 0.99;
    expect(total).toBe(expectedTotal);
  });

  it('should calculate total using array methods', (): void => {
    const calculateLineItemTotals = pipe(map(getLineItemOfferPrice));
    const total = calculateLineItemTotals(lineItems);
    const expectedTotal = 39.99 * 2 + 0.99;
    expect(total).toBe(expectedTotal);
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

// it('should format client pricing with combinatorics', () => {
//   const valueIntPrice = jsc.record({ value: jsc.nat() });
//   const valueNullPrice = jsc.record({ value: jsc.constant(null) });

//   expect(
//       jsc.check(
//           jsc.forall(
//               jsc.oneof([valueIntPrice]),
//               jsc.oneof([valueIntPrice, valueNullPrice]),
//               (listPrice: any, salePrice: any) => {
//                   const pricing = {
//                       listPrice,
//                       salePrice,
//                   };
//                   const result = getActiveClientPricing({ pricing, price: listPrice } as any, null);
//                   return (
//                       doesPriceMatch(listPrice, result.listPrice) &&
//                       (doesSalePriceMatch(salePrice, result.salePrice) ||
//                           pricing.salePrice.value >= pricing.listPrice.value)
//                   );
//               }
//           )
//       ),
//       { rngState: '153e9c5f037a8c37b2' } as any
//   ).equals(true);
// });

// it('should return full variant combinatorial pricing', () => {
//   expect(
//       jsc.check(
//           jsc.forall(jsc.number, jsc.number, jsc.string, (listPrice: any, salePrice: any, pvId: string) => {
//               const variantPricing = { listPrice, salePrice };
//               const prod = createProductWithVariant(variantPricing, listPrice, pvId);
//               const actual = getProductVariantPricing(prod);
//               return actual === variantPricing;
//           })
//       ),
//       { rngState: '123e9c5f037a8b21d6' } as any
//   ).equals(true);
// });

// it('should getUpdatedPricing with combinatorial tests', () => {
//   const positiveNumber = jsc.number(0.01, 999999.99);
//   const nullValue = jsc.constant(null);
//   expect(
//       jsc.check(
//           jsc.forall(
//               // cart
//               positiveNumber,
//               jsc.oneof([positiveNumber, nullValue]),
//               jsc.oneof([positiveNumber, nullValue]),
//               jsc.oneof([positiveNumber, nullValue]),
//               // repo
//               positiveNumber,
//               jsc.oneof([positiveNumber, nullValue]),
//               jsc.oneof([positiveNumber, nullValue]),
//               jsc.oneof([positiveNumber, nullValue]),
//               (
//                   list: any,
//                   sale: any,
//                   pvList: any,
//                   pvSale: any,
//                   rList: any,
//                   rSale: any,
//                   rpvList: any,
//                   rpvSale: any
//               ) => {
//                   const cartItemProduct = createItemProduct(list, sale, pvList, pvSale);
//                   const repoItemProduct = createItemProduct(rList, rSale, rpvList, rpvSale);
//                   const actual = getUpdatedPricing(cartItemProduct, repoItemProduct);
//                   // precedence order.
//                   return (
//                       actual.pricing.listPrice === rpvList ||
//                       actual.pricing.listPrice === rList ||
//                       actual.pricing.listPrice === pvList ||
//                       actual.pricing.listPrice === list
//                   );
//               }
//           )
//       ),
//       { rngState: '143e9c5f037a8c37b2' } as any
//   ).equals(true);
// });
