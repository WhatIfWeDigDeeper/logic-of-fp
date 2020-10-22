export const getOfferPrice = (price) => !price.salePrice ? price.listPrice : price.salePrice;
export const getSubTotal = (products) =>
  products.map(x => (!x.price.salePrice ? x.price.listPrice : x.price.salePrice) * x.quantity)
    .reduce((acc,b) => acc + b, 0);

//const tax = subTotal * 0.825;
//const total = subTotal + total;
// const itemCount = products.map(x => x.quantity).reduce((acc,b) => acc + b, 0);



export const sum = (a, b) => a + b;
//products.map(x => getOfferPrice(x.price) * x.quantity).reduce(sum)
export const getOfferPriceWithQuantity = (x) => getOfferPrice(x.price) * x.quantity;
export const getListPriceWithQuantity = (x) => x.price.listPrice * x.quantity;

//products.map(getOfferPriceWithQuantity).reduce(sum);


export const listTotal = (products) => products.map(getListPriceWithQuantity).reduce(sum);
export const offerTotal = (products) => products.map(getOfferPriceWithQuantity).reduce(sum);
export const getSavings = (products) => listTotal(products) - offerTotal(products);


// [products] -> CartTotal
export const calculateCartTotal = (products, taxRate = 0.0825) => {
  const subtotal = getSubTotal(products);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const savings = getSavings(products);
  return new CartTotal(subtotal, tax, total, savings);
};

// const calculateCartSubtotal = (products)
//
//
// const sumBy3 = (products, fldSelector) => {
// return products.map(fldSelector).reduce(sum);
// }
//
class CartTotal {
  constructor(subtotal, tax, total, savings=0.0) {
    this.subtotal = subtotal;
    this.tax = tax;
    this.total = total;
    this.savings = savings;
    Object.freeze(this);
  }

}


// Define other methods and classes here
/*

let xs = [{city:'Austin', pop: 450223}, {city: 'Dallas', pop: 222222}, {city:'Houston',pop:3234343}];

xs.filter(x => x.city !== 'Dallas')
  .map(x=> x.pop)
  .reduce((sum, y) => (sum + y), 0)


average(xs.filter(x => x.city !== 'Dallas')
          .map(x=> x.pop))

const average = xs => xs.reduce((acc, x) => acc + x, 0) / xs.length;

let items = [{
name: 'GoPro',
price: {
listPrice: 399.99,
salePrice: 379.99
}
}, {
name: 'Roomba',
price: {
listPrice: 699.99,
salePrice: 599.99
}
}, {
name: 'iPad',
price: {
listPrice: 699.99
}
}
];

*/


//import { calculateCartTotal } from './index';

describe('Product Total', () => {
  const products = [{
    name: 'GoPro',
    quantity: 2,
    price: {
      listPrice: 300,
      salePrice: 200
    }
  }, {
    name: 'iPad Pro',
    quantity: 1,
    price: {
      listPrice: 1000
    }
  }
  ];

  it('should calculate cart total', () => {

    expect(calculateCartTotal(products))
      .toEqual({
        subTotal: 0.0,
        tax: 0.0,
        total: 0.0,
        savings: 0.0
      });
  });
});
