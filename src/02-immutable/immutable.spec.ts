import * as R from 'ramda';
import { cloneDeepWith } from 'lodash/fp';
// import { produce } from 'immer';
import { List, Map, Range, Seq } from 'immutable';

import { Price, Product, ViewProduct } from '../types';

describe('Mutable parameter', (): void => {
  function getOffer(product: Product): number {
    if (
      product.price.sale !== undefined &&
      product.price.sale < product.price.list
    ) {
      product.name = `${product.name} - ON SALE!`;
      return product.price.sale;
    }
    return product.price.list;
  }

  // function createViewProduct(product: Product): ViewProduct {
  //   const offerPrice = getOffer(product);
  //   const viewProduct: ViewProduct = product as ViewProduct;
  //   viewProduct.offerPrice = offerPrice;
  //   return viewProduct;
  // }

  // it('will get offerPrice and add ON SALE message', (): void => {
  //   const price: Price = { list: 19.99, sale: 14.99 };
  //   const product: Product = { name: 'test', price };

  //   const viewProduct: ViewProduct = createViewProduct(product);

  //   expect(viewProduct.name).toBe('test - ON SALE!');
  //   expect(viewProduct.offerPrice).toBe(14.99);
  // });

  // it('will return the same result when called twice', (): void => {
  //   const price: Price = { list: 19.99, sale: 14.99 };
  //   const product: Product = { name: 'test', price };

  //   let viewProduct: ViewProduct = createViewProduct(product);
  //   expect(viewProduct.name).toBe('test - ON SALE!');
  //   expect(viewProduct.offerPrice).toBe(14.99);

  //   viewProduct = createViewProduct(product);
  //   expect(viewProduct.name).toBe('test - ON SALE!');
  //   expect(viewProduct.offerPrice).toBe(14.99);
  // });

  it('will get offerPrice and add ON SALE message', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    let offerPrice = getOffer(product);
    expect(offerPrice).toBe(14.99);
    expect(product.name).toBe('test - ON SALE!');
  });

  xit('will not return the same result twice', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    let offerPrice = getOffer(product);
    expect(offerPrice).toBe(14.99);
    expect(product.name).toBe('test - ON SALE!');

    offerPrice = getOffer(product);
    expect(product.name).toBe('test - ON SALE!');
  });
});

describe('Refactor 1', (): void => {
  function getOfferPrice(product: Product): number {
    if (
      product.price.sale !== undefined &&
      product.price.sale < product.price.list
    ) {
      return product.price.sale;
    }
    return product.price.list;
  }

  function getDisplayName(product: Product): string {
    if (
      product.price.sale !== undefined &&
      product.price.sale < product.price.list
    ) {
      return `${product.name} - ON SALE!`;
    }
    return product.name;
  }

  function createViewProduct(product: Product): ViewProduct {
    const offerPrice = getOfferPrice(product);
    const name = getDisplayName(product);
    return { ...product, name, offerPrice };
  }

  it('will return the same result twice', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    const viewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');

    const viewProduct2 = createViewProduct(product);
    expect(viewProduct2.name).toBe('test - ON SALE!');
  });

  it('will get offerPrice and add ON SALE message', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    let viewProduct: ViewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);

    viewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);
  });
});
describe('Refactor 1.1 readonly', (): void => {
  function getOfferPrice(product: Readonly<Product>): number {
    if (
      product.price.sale !== undefined &&
      product.price.sale < product.price.list
    ) {
      return product.price.sale;
    }
    return product.price.list;
  }

  function getDisplayName(product: Readonly<Product>): string {
    if (
      product.price.sale !== undefined &&
      product.price.sale < product.price.list
    ) {
      return `${product.name} - ON SALE!`;
    }
    return product.name;
  }

  function createViewProduct(product: Readonly<Product>): ViewProduct {
    const offerPrice = getOfferPrice(product);
    const name = getDisplayName(product);
    return { ...product, name, offerPrice };
  }

  it('will not return the same result twice', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    let offerPrice = getOfferPrice(product);
    expect(offerPrice).toBe(14.99);
    expect(product.name).toBe('test');

    offerPrice = getOfferPrice(product);
    expect(product.name).toBe('test');
  });

  it('will get offerPrice and add ON SALE message', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    let viewProduct: ViewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);

    viewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);
  });
});

describe('Refactor 2 productOnSale', (): void => {
  function isProductOnSale(product: Readonly<Product>): boolean {
    return (
      product.price.sale !== undefined &&
      product.price.sale < product.price.list
    );
  }

  function getOfferPrice(product: Readonly<Product>): number {
    if (isProductOnSale(product)) {
      return product.price.sale!;
    }
    return product.price.list;
  }

  function getDisplayName(product: Readonly<Product>): string {
    if (isProductOnSale(product)) {
      return `${product.name} - ON SALE!`;
    }
    return product.name;
  }

  function createViewProduct(product: Product): ViewProduct {
    const offerPrice = getOfferPrice(product);
    const name = getDisplayName(product);
    return { ...product, name, offerPrice };
  }

  it('will get offerPrice and add ON SALE message', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    let viewProduct: ViewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);

    viewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);

    expect(product.name).toBe('test');
  });
});

describe('Refactor 3 Readonly', (): void => {
  function isOnSale(price: Readonly<Price>): boolean {
    return price.sale !== undefined && price.sale < price.list;
  }

  function getOfferPrice(price: Readonly<Price>): number {
    if (isOnSale(price)) {
      return price.sale!;
    }
    return price.list;
  }

  function getDisplayName(product: Readonly<Product>): string {
    if (isOnSale(product.price)) {
      return `${product.name} - ON SALE!`;
    }
    return product.name;
  }

  function createViewProduct(product: Readonly<Product>): ViewProduct {
    const offerPrice = getOfferPrice(product.price);
    const name = getDisplayName(product);
    return { ...product, name, offerPrice };
  }

  it('will get offerPrice and add ON SALE message', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    let viewProduct: ViewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);

    viewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);

    expect(product.name).toBe('test');
  });
});

describe('Refactor 4 expressions', (): void => {
  const isOnSale = (price: Readonly<Price>): boolean =>
    price.sale !== undefined && price.sale < price.list;

  const getOfferPrice = (price: Readonly<Price>): number =>
    isOnSale(price) ? price.sale! : price.list;

  const getDisplayName = (product: Readonly<Product>): string =>
    isOnSale(product.price) ? `${product.name} - ON SALE!` : product.name;

  const createViewProduct = (product: Readonly<Product>): ViewProduct => ({
    ...product,
    name: getDisplayName(product),
    offerPrice: getOfferPrice(product.price),
  });

  it('will get offerPrice and add ON SALE message', (): void => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };

    const viewProduct: ViewProduct = createViewProduct(product);
    expect(viewProduct.name).toBe('test - ON SALE!');
    expect(viewProduct.offerPrice).toBe(14.99);

    const viewProduct2 = createViewProduct(product);
    expect(viewProduct2.name).toBe('test - ON SALE!');
    expect(viewProduct2.offerPrice).toBe(14.99);

    expect(product.name).toBe('test');
  });

  it('should throw error on attempt to modify frozen object', () => {
    const price: Price = { list: 19.99, sale: 14.99 };
    Object.freeze(price);
    const product: Product = { name: 'test', price };
    Object.freeze(product);

    expect(() => {
      product.name = 'Mr. Freeze';
    }).toThrow();
    expect(() => {
      product.price.sale = 0.99;
    }).toThrow();
  });
});

describe('const', () => {
  it('const will not prevent modification of array member', () => {
    const ary = [1, 2, 4, 8];
    ary.push(16);
    expect(ary.length).toEqual(5);
  });

  it('will not prevent modification of object properties', () => {
    const price: Price = { list: 39.99 };
    const prod: Product = { name: 'test', price };

    prod.price.list = 19.99;
    prod.price.sale = 1;

    expect(price.list).not.toEqual(39.99);
    expect(price.sale).toEqual(1);
  });
});

describe('Object.freeze', (): void => {
  const isOnSale = (product: Product): boolean =>
    product.price.sale !== undefined && product.price.sale < product.price.list;

  const createViewProduct = (product: Product): ViewProduct => {
    const offerPrice = getOffer(product);
    return { ...product, offerPrice };
  };

  // const getViewProduct2 = (product: Product): ViewProduct => {
  //   const offerPrice = getOffer(product);
  //   return { ...product, offerPrice };
  // };

  const getOffer = (product: Product): number => {
    if (isOnSale(product)) {
      return product.price.sale!;
    }
    return product.price.list;
  };

  it('should not throw error on attempt to update value', () => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };
    Object.freeze(product);

    product.price.sale = 1;
    product.price.sale = getOffer(product);
    expect(product.price.sale).toEqual(1);
    createViewProduct(product);
  });

  it('should throw error on attempt to modify frozen nested objet', () => {
    const price: Price = { list: 19.99, sale: 14.99 };
    Object.freeze(price);
    const product: Product = { name: 'test', price };

    expect(() => {
      product.price.sale = 1;
    }).toThrow();
  });

  it('should throw error on attempt to modify frozen object', () => {
    const price: Price = { list: 19.99, sale: 14.99 };
    Object.freeze(price);
    const product: Product = { name: 'test', price };
    Object.freeze(product);

    expect(() => {
      product.name = 'Mr. Freeze';
    }).toThrow();
    expect(() => {
      product.price.sale = 0.99;
    }).toThrow();
  });

  const frozen = (value: object) => Object.freeze(value);
  const deepFreeze = cloneDeepWith(frozen);

  xit('should throw error on attempt to modify frozen object', () => {
    const price: Price = { list: 19.99, sale: 14.99 };
    const product: Product = { name: 'test', price };
    const frozen = deepFreeze(product);
    const price2: Price = { list: 19.99, sale: 1 };

    expect(() => {
      frozen.name = 'Elsa';
    }).toThrow();

    expect(() => {
      frozen.price = price2;
    }).toThrow();

    expect(() => {
      frozen.price.sale = 0.05;
    }).toThrow();
  });
});

describe('Object.merge or ...', () => {
  const listPrice: { list: number } = { list: 19.99 };
  const salePrice: { sale: number } = { sale: 14.95 };

  it('should use Object.merge', () => {
    const price: Price = Object.assign({}, listPrice, salePrice);

    expect(price.sale).toEqual(14.95);
  });

  it('should use object spread operator ...', () => {
    const price: Price = { ...listPrice, ...salePrice };

    expect(price.sale).toEqual(14.95);
  });
});

describe('typescript readonly', (): void => {
  it('will prevent array modification', (): void => {
    const ary: readonly number[] = [1, 2, 4, 8];
    // @ts-expect-error Property push does not exist on type 'readonly number[]'
    ary.push(16);
    expect(ary.length).toBe(5);
  });

  const getOffer = (product: Readonly<Product>): number => {
    if (product.price.sale !== undefined) {
      // @ts-expect-error Can't assign to name as it is a read-only property
      product.name = `${product.name} - ON SALE!`;
      return product.price.sale;
    }
    return product.price.list;
  };

  it('will prevent modification of function parameters', (): void => {
    const product: Product = {
      name: 'No Touchy',
      price: { list: 19.99, sale: 14.99 },
    };
    const offerPrice = getOffer(product);
    expect(offerPrice).toBe(14.99);
  });

  const getOfferPrice = (product: Readonly<Product>): number =>
    product.price.sale !== undefined ? product.price.sale : product.price.list;

  it('will prevent modification of function parameters', (): void => {
    const product: Product = {
      name: 'No Touchy',
      price: { list: 19.99, sale: 14.99 },
    };
    const offerPrice = getOfferPrice(product);
    expect(offerPrice).toBe(14.99);
  });
});

// https://dev.to/alekseiberezkin/what-happened-to-immutable-js-and-how-can-we-react-5c34
describe('immutable.js', (): void => {
  // https://immutable-js.github.io/immutable-js/
  it('set should return a new Map', (): void => {
    const map1 = Map({ a: 1, b: 2, c: 3 });
    const map2 = map1.set('b', 50);

    expect(map1.get('b')).toBe(2);
    expect(map2.get('b')).toBe(50);
  });
  it('should return a new list upon modification', (): void => {
    const list1 = List([1, 2]);
    const list2 = list1.push(3, 4, 5);

    expect(list1.size).toBe(2);
    expect(list2.size).toBe(5);
  });
  it('can convert normal JS objects', (): void => {
    const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });
    const obj = { d: 100, e: 200, f: 300 };

    const map2 = map1.merge(obj);

    expect(map2.size).toBe(6);
  });
  it('can convert back to raw JS', (): void => {
    const ary = [1, 2, 3];
    const obj = { a: 1, b: 2, c: 3 };
    const list1 = List(ary);
    const map = Map(obj);

    expect(list1.toArray()).toEqual(ary);
    expect(map.toJS()).toEqual(obj);
  });
  it('optimizes through structural sharing', (): void => {
    const { Map } = require('immutable');
    const originalMap = Map({ a: 1, b: 2, c: 3 });
    const updatedMap = originalMap.set('b', 2);

    // No-op .set() returned the original reference.
    expect(updatedMap).toEqual(originalMap);
    expect(updatedMap).toBe(originalMap);
  });
  it('has lazy evaluation by not creating intermediate collections', (): void => {
    // similar to C# LINQ
    const result = Range(1, Infinity)
      .skip(1000)
      .map((n) => -n)
      .filter((n) => n % 2 === 0)
      .take(2)
      .reduce((r, n) => r * n, 1);
    expect(result).toBe(1006008);
  });
  it('any collection can be converted to lazy', (): void => {
    const map = Map({ a: 1, b: 2, c: 3 });
    const lazySeq = Seq(map);
    const result = lazySeq
      .flip()
      .map((key: string) => key.toUpperCase())
      .flip();
    expect(result.toJS()).toEqual({ A: 1, B: 2, C: 3 });
  });
});

// https://immerjs.github.io/immer/docs/introduction
// describe('immer', (): void => {
//   interface ToDo {
//     todo: string;
//     done?: boolean;
//   }
//   it('will not modify original state', (): void => {
//     const baseState: ToDo[] = [
//       {
//         todo: 'Learn typescript',
//         done: true,
//       },
//       {
//         todo: 'Try immer',
//         done: false,
//       },
//     ];

//     const nextState = produce(baseState, (draftState) => {
//       draftState.push({ todo: 'Tweet about it' });
//       draftState[1].done = true;
//     });

//     // the new item is only added to the next state,
//     // base state is unmodified
//     expect(baseState.length).toBe(2);
//     expect(nextState.length).toBe(3);

//     // same for the changed 'done' prop
//     expect(baseState[1].done).toBe(false);
//     expect(nextState[1].done).toBe(true);

//     // unchanged data is structurally shared
//     expect(nextState[0]).toBe(baseState[0]);
//     // changed data not (dûh)
//     expect(nextState[1]).not.toBe(baseState[1]);
//   });
// });

describe('Ramda lenses', () => {
  it('should return new product when modifying through lens', () => {
    const price: Price = { list: 399.99, sale: 389.95 };
    const product: Product = { name: 'test', price };

    const salePriceLens = R.lens(
      R.path(['price', 'sale']),
      R.assocPath(['price', 'sale'])
    );

    const actual: Product = R.set(salePriceLens, 1.95, product);

    expect(actual.price.sale).not.toEqual(product.price.sale);
  });
});
