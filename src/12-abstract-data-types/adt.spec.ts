// https://fsharpforfunandprofit.com/posts/designing-with-types-representing-states/#using-explicit-cases-to-replace-implicit-conditional-code

type ShippingMethod = 'Express' | 'Priority' | 'Ground' | 'Freight';
interface Order1 {
  orderId: number;
  placedDate: Date;
  paidDate?: Date;
  paidAmount?: number;
  shippedDate?: Date;
  shippingMethod?: ShippingMethod;
  returnedDate?: Date;
  returnedReason?: string;
}

interface InitialOrderData {
  orderId: number;
  placedDate: Date;
}
interface PaidOrderData {
  date: Date;
  amount: number;
}
interface ShippedOrderData {
  date: Date;
  method: ShippingMethod;
}
interface ReturnedOrderData {
  date: Date;
  reason: string;
}

type Unpaid = InitialOrderData;
type Paid = InitialOrderData & PaidOrderData;
type Shipped = InitialOrderData & PaidOrderData & ShippedOrderData;
type Returned = InitialOrderData &
  PaidOrderData &
  ShippedOrderData &
  ReturnedOrderData;

type Order = Unpaid | Paid | Shipped | Returned;

describe('type enforces correctness', (): void => {
  xit('should not allow an unpaid order to ship', (): void => {
    // @ts-expect-error
    const order: Shipped = {
      orderId: 123,
      // amount: 199.95,
      date: new Date(),
      method: 'Express',
      placedDate: new Date(),
    };
    expect(order.amount).toBe(199.95);
  });
});
