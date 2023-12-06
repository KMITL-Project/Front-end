export type ShelfStatus = 'completed' | 'pending' | 'failed';

export interface Shelf {
  id: string;
  status: ShelfStatus;
  shelfDetails: string;
  shelfDate: number;
  shelfID: string;
  sourceName: string;
  shelfName:string;
  shelfDescription: string;
  unit: string;
  sourceDesc: string;
  amountShelf: number;
  amount: number;
  shelfCurrency: string;
  currency: string;
}
