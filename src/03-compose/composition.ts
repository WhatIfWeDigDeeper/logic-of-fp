import { compose, flow } from 'lodash/fp';

import { LineItem, Price, Product } from '../types';

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

describe('flow', () => {
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
    const subtotal = flow(getOfferPrices, sum)(products);
    expect(subtotal).toEqual(115);
  });

  it('should compose and calculate charge amount', () => {
    const calculateSubtotal = flow(getOfferPrices, sum);

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

  const sum = (ns: number[]): number => ns.reduce(add, 0);

  const getOfferPrices = (products: readonly Product[]): number[] =>
    products.map(getOfferPrice);

  const getTotal = (prices: number[]): number =>
    prices.reduce((acc, item) => acc + item, 0);

  const getLineItemOfferPrice = (lineItem: LineItem): number =>
    lineItem.quantity * getOfferPrice(lineItem.item);

  it('should calculate total using array methods', (): void => {
    const total = lineItems.map(getLineItemOfferPrice);
    const expectedTotal = 39.99 * 2 + 0.99;
    expect(total).toBe(expectedTotal);
  });
});
