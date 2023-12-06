import { Card } from '@mui/material';
import { Order } from '@/model/order';
import RecentOrdersTable from './UnitTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: Order[] = [
    {
      id: '1',
      orderDetails: 'VUVX709ET7BY',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'อัน',
      sourceName: 'อัน',
      sourceDesc: '*** 1111',
      amountOrder: 34.4565,
      amount: 56787,
      orderCurrency: 'ETH',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: '23M3UOG65G8K',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: 'ชิ้น',
      sourceName: 'ชิ้น',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '3',
      orderDetails: 'F6JHK65MS818',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      orderID: 'แผ่น',
      sourceName: 'แผ่น',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '4',
      orderDetails: 'QJFAI7N84LGM',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'แท่ง',
      sourceName: 'แท่ง',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '5',
      orderDetails: 'QJFAI7N84LGM',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'แผ่น',
      sourceName: 'แผ่น',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '6',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: '6RS606CBMKVQ',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '7',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: '479KUYHOBMJS',
      sourceName: 'Bank Account',
      sourceDesc: '*** 1212',
      amountOrder: 2.346546,
      amount: 234234,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '8',
      orderDetails: 'Paypal Withdraw',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'W67CFZNT71KR',
      sourceName: 'Paypal Account',
      sourceDesc: '*** 1111',
      amountOrder: 3.345456,
      amount: 34544,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '9',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Bank Account',
      sourceDesc: '*** 2222',
      amountOrder: 1.4389567945,
      amount: 123843,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '10',
      orderDetails: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: '17KRZHY8T05M',
      sourceName: 'Wallet Transfer',
      sourceDesc: "John's Cardano Wallet",
      amountOrder: 765.5695,
      amount: 7567,
      orderCurrency: 'ADA',
      currency: '$'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
