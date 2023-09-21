export type OrderStatus = 'completed' | 'pending' | 'failed';

export interface Order {
  id: string;
  status: OrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  sourceDesc: string;
  amountOrder: number;
  amount: number;
  orderCurrency: string;
  currency: string;
}
