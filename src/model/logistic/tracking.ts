export type TrackingStatus = 'completed' | 'pending' | 'failed';

export interface Tracking {
  id: string;
  orderID: string;
  status: TrackingStatus;
  productName: string;
  customerName: string;
  customerAddress: string;
  shippingDate: number;
}