export type OrderStatus = 'completed' | 'pending' | 'failed';

export interface Order {
  id: string;
  status: OrderStatus;
  orderDetails: string;
  orderDate: number;
  orderID: string;
  sourceName: string;
  unit: string;
  shelf: string;
  floor: string;
  sourceDesc: string;
  amountOrder: number;
  amount: number;
  orderCurrency: string;
  currency: string;
}
