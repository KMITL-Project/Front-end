export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  status: CryptoOrderStatus;
  name: string;
  orderDate: number;
  category: string;
  amount: number;
  unit: string;
  shelf: string;
}