import { Card } from '@mui/material';
import { Order } from '@/model/logistic/order';
import RecentOrdersTable from './PermissionTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: Order[] = [
    {
      id: '1',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'admin',
      orderID: 'OMG3UOG65G8K',
      sourceName: 'Megan',
      unit: 'ชิ้น',
      sourceDesc: '*** 1111',
      amountOrder: 34.4565,
      amount: 56787,
      orderCurrency: 'ETH',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'guess',
      orderID: '23M3UOG65G8K',
      sourceName: 'Megan',
      unit: 'อัน',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '3',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'member',
      orderID: 'F6JHK65MS818',
      sourceName: 'Megan',
      unit: 'ชิ้น',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '4',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'member',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Megan',
      unit: 'แผ่น',
      sourceDesc: '*** 1111',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'BTC',
      currency: '$'
    },
    {
      id: '5',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'member',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Megan',
      unit: 'ชิ้น',
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
      status: 'guess',
      orderID: '6RS606CBMKVQ',
      sourceName: 'Megan',
      unit: 'ชิ้น',
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
      status: 'member',
      orderID: '479KUYHOBMJS',
      sourceName: 'Megan',
      unit: 'ชิ้น',
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
      status: 'member',
      orderID: 'W67CFZNT71KR',
      sourceName: 'Megan',
      unit: 'ชิ้น',
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
      status: 'member',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Megan',
      unit: 'ชิ้น',
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
      status: 'member',
      orderID: '17KRZHY8T05M',
      sourceName: 'Megan',
      sourceDesc: "John's Cardano Wallet",
      unit: '-',
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
