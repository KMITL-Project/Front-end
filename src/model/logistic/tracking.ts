export type TrackingStatus = 'completed' | 'pending' | 'failed';

export interface Tracking {
  id: string;
  shelfID: string;
  status: TrackingStatus;
  shelfDate: number;
  shelfName: string;
  shelfDescription: string;
  sourceDesc: string;
  amountShelf: number;
  amount: number;
  shelfCurrency: string;
  currency: string;
}