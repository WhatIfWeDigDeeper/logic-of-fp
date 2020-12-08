export interface Price {
  list: number;
  sale?: number;
}

export interface Product {
  name: string;
  price: Price;
  category?: string;
  hidden?: boolean;
}

export interface ViewProduct extends Product {
  offerPrice: number;
}

export interface LineItem {
  quantity: number;
  item: Product;
}

// export class Product {
//   name: string;
//   price: Price;

//   constructor(name: string, price: Price) {
//     this.name = name;
//     this.price = price;
//   }
// }

// export class CartTotal {
//   subtotal: number;
//   tax: number;
//   total: number;
//   savings: number;

//   constructor(
//     subtotal: number,
//     tax: number,
//     total: number = 0.0,
//     savings: number = 0.0
//   ) {
//     this.subtotal = subtotal;
//     this.tax = tax;
//     this.total = total;
//     this.savings = savings;
//     Object.freeze(this);
//   }
// }
