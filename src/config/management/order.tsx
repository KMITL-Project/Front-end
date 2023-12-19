export type OrderStatus = 'completed' | 'pending' | 'failed';

export interface Order {
  id: string;
  status: OrderStatus;
  name: string;
  orderDate: number;
  category: string;
  amount: number;
  unit: string;
  shelf: string;
}
