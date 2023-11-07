import { Card } from '@mui/material';
import { Order } from '@/model/order';
import RecentOrdersTable from './CustomerListTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: Order[] = [
    {
      id: '1',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'VUVX709ET7BY',
      sourceName: 'Jack Dawson',
      sourceDesc: 'ลาดกระบัง',
      amountOrder: 34.4565,
      amount: 56787,
      orderCurrency: 'ประตู',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: '23M3UOG65G8K',
      sourceName: 'Bartosz Little',
      sourceDesc: 'หนองจอก',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'ประตู',
      currency: '$'
    },
    {
      id: '3',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'cancelled',
      orderID: 'F6JHK65MS818',
      sourceName: 'Freddie Newman',
      sourceDesc: 'บางนา',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'ประตู',
      currency: '$'
    },
    {
      id: '4',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Nathaniel Haas',
      sourceDesc: 'บึงกุ่ม',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'ประตู',
      currency: '$'
    },
    {
      id: '5',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Jim Green',
      sourceDesc: 'ประเวศ',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'ประตู',
      currency: '$'
    },
    {
      id: '6',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: '6RS606CBMKVQ',
      sourceName: 'Aamir Aguilar',
      sourceDesc: 'พญาไท',
      amountOrder: 6.58454334,
      amount: 8734587,
      orderCurrency: 'ป้าย',
      currency: '$'
    },
    {
      id: '7',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: '479KUYHOBMJS',
      sourceName: 'Enzo Soto',
      sourceDesc: 'ราชเทวี',
      amountOrder: 2.346546,
      amount: 234234,
      orderCurrency: 'ป้าย',
      currency: '$'
    },
    {
      id: '8',
      orderDetails: 'Paypal Withdraw',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'W67CFZNT71KR',
      sourceName: 'Karen Mckay',
      sourceDesc: 'บางเขน',
      amountOrder: 3.345456,
      amount: 34544,
      orderCurrency: 'รั้ว',
      currency: '$'
    },
    {
      id: '9',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Helena Carson',
      sourceDesc: '*** 2222',
      amountOrder: 1.4389567945,
      amount: 123843,
      orderCurrency: 'อ่อนนุช',
      currency: '$'
    },
    {
      id: '10',
      orderDetails: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'cancelled',
      orderID: '17KRZHY8T05M',
      sourceName: 'Sylvie White',
      sourceDesc: "John's Cardano Wallet",
      amountOrder: 765.5695,
      amount: 7567,
      orderCurrency: 'สุขุมวิท',
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
