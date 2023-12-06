import { Card } from '@mui/material';
import { Shelf } from '@/model/setup/shelf';
import RecentShelvesTable from './ShelfTable';
import { subDays } from 'date-fns';

function RecentShelves() {
  const mockShelves: Shelf[] = [
    {
      id: '1',
      shelfID: 'VUVX709ET7BY',
      shelfDate: new Date().getTime(),
      status: 'completed',
      shelfName: 'Shelf 1',
      shelfDescription: 'อุปกรณ์ช่าง',
      sourceDesc: '*** 1111',
      amountShelf: 34.4565,
      amount: 56787,
      shelfCurrency: 'ETHx',
      currency: '$'
    },
    {
      id: '2',
      shelfID: '23M3UOG65G8K',
      shelfDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      shelfName: 'Shelf 2',
      shelfDescription: 'อุปกรณ์ช่าง',
      sourceDesc: '*** 1111',
      amountShelf: 6.58454334,
      amount: 8734587,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '3',
      shelfID: 'F6JHK65MS818',
      shelfDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      shelfName: 'Shelf 3',
      shelfDescription: 'แผ่นอลูมิเนียม',
      sourceDesc: '*** 1111',
      amountShelf: 6.58454334,
      amount: 8734587,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '4',
      shelfID: 'QJFAI7N84LGM',
      shelfDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      shelfName: 'Shelf 4',
      shelfDescription: 'แผ่นเหล็ก',
      sourceDesc: '*** 1111',
      amountShelf: 6.58454334,
      amount: 8734587,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '5',
      shelfID: 'BO5KFSYGC0YW',
      shelfDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      shelfName: 'Shelf 5',
      shelfDescription: 'วัสดุสิ้นเปลือง',
      sourceDesc: '*** 1111',
      amountShelf: 6.58454334,
      amount: 8734587,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '6',
      shelfID: 'Fiat Deposit',
      shelfDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      shelfName: '6RS606CBMKVQ',
      shelfDescription: 'Bank Account',
      sourceDesc: '*** 1111',
      amountShelf: 6.58454334,
      amount: 8734587,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '7',
      shelfID: 'Fiat Deposit',
      shelfDate: new Date().getTime(),
      status: 'pending',
      shelfName: '479KUYHOBMJS',
      shelfDescription: 'Bank Account',
      sourceDesc: '*** 1212',
      amountShelf: 2.346546,
      amount: 234234,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '8',
      shelfID: 'Paypal Withdraw',
      shelfDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      shelfName: 'W67CFZNT71KR',
      shelfDescription: 'Paypal Account',
      sourceDesc: '*** 1111',
      amountShelf: 3.345456,
      amount: 34544,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '9',
      shelfID: 'Fiat Deposit',
      shelfDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      shelfName: '63GJ5DJFKS4H',
      shelfDescription: 'Bank Account',
      sourceDesc: '*** 2222',
      amountShelf: 1.4389567945,
      amount: 123843,
      shelfCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '10',
      shelfID: 'Wallet Transfer',
      shelfDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      shelfName: '17KRZHY8T05M',
      shelfDescription: 'Wallet Transfer',
      sourceDesc: "John's Cardano Wallet",
      amountShelf: 765.5695,
      amount: 7567,
      shelfCurrency: 'ADA',
      currency: '$'
    }
  ];

  return (
    <Card>
      <RecentShelvesTable mockShelves={mockShelves} />
    </Card>
  );
}

export default RecentShelves;
