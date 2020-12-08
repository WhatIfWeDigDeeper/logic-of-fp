import { groupBy, partition, sortBy, map } from 'lodash/fp';

import { Price, Product } from '../types';

const isOnSale = (price: Readonly<Price>): boolean =>
  price.sale !== undefined && price.sale < price.list;

const isProductOnSale = (product: Readonly<Product>): boolean =>
  isOnSale(product.price);
const products: Product[] = [
  {
    category: 'cat1',
    name: 'prod1',
    price: {
      list: 19.95,
    },
  },
  {
    category: 'cat1',
    name: 'prod2',
    price: {
      list: 29.95,
      sale: 24.99,
    },
    hidden: true,
  },
  {
    category: 'cat2',
    name: 'prod3',
    price: {
      list: 19.95,
      sale: 14.95,
    },
  },
];

const identity = <T>(x: T): T => x;

const getOfferPrice = (price: Readonly<Price>): number =>
  isOnSale(price) ? price.sale! : price.list;

const getProductOfferPrice = (product: Readonly<Product>): number =>
  getOfferPrice(product.price);

describe('Higher Order functions', (): void => {
  it('should use 2 different functions', (): void => {
    const categoryGrouping = groupBy((item) => item.category, products);

    expect(categoryGrouping.cat1.length).toBe(2);
    expect(categoryGrouping.cat2.length).toBe(1);
  });

  it('should sort by identity', (): void => {
    const sorted = sortBy(identity, [5, 2, 10, 8, 11]);
    expect(sorted).toEqual([2, 5, 8, 10, 11]);
  });

  it('should sort by offer price', (): void => {
    const sortedProducts = sortBy(getProductOfferPrice, products);
    const mappedPrices = map((item: Product) => item.price, sortedProducts);
    expect(mappedPrices).toEqual([
      {
        list: 19.95,
        sale: 14.95,
      },
      {
        list: 19.95,
      },
      {
        list: 29.95,
        sale: 24.99,
      },
    ]);
  });

  const isHidden = (product: Readonly<Product>): boolean =>
    Boolean(product.hidden);

  it('should filter hidden products', (): void => {
    const visibleProducts = products.filter((p: Product) => !isHidden(p));

    expect(visibleProducts.length).toBe(2);
  });

  it('should filter hidden products', (): void => {
    const visibleProducts = products.filter(isVisible);

    expect(visibleProducts.length).toBe(2);
  });

  const isVisible = (product: Readonly<Product>): boolean => !isHidden(product);

  it('should filter hidden products', (): void => {
    const visibleProducts = products.filter((p) => !isHidden(p));

    expect(visibleProducts.length).toBe(2);
  });

  it('should use partition', (): void => {
    const [hiddenProducts, visibleProducts] = partition(isHidden, products);

    expect(hiddenProducts.length).toBe(1);
    expect(visibleProducts.length).toBe(2);
  });

  it('should pass a different function to get different behavior', (): void => {
    const [onSale, list] = partition(isProductOnSale, products);

    expect(onSale.length).toBe(2);
    expect(list.length).toBe(1);
  });
});
