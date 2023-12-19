import { Card } from '@mui/material';
import { Order } from '@/model/order';
import RecentOrdersTable from './ReportTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: Order[] = [
    {
      id: '1',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'เหล็ก 8*8',
      sourceName: 'เหล็ก',
      unit: 'ชิ้น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      status: 'completed',
      orderID: '23M3UOG65G8K',
      sourceName: 'ไม้',
      unit: 'อัน',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      status: 'failed',
      orderID: 'F6JHK65MS818',
      sourceName: 'อลูมิเนียม',
      unit: 'ชิ้น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      status: 'completed',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'อลูมิเนียม',
      unit: 'แผ่น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      status: 'pending',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'อลูมิเนียม',
      unit: 'ชิ้น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      sourceName: 'อลูมิเนียม',
      unit: 'ชิ้น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      sourceName: 'อลูมิเนียม',
      unit: 'ชิ้น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      sourceName: 'อลูมิเนียม',
      unit: 'ชิ้น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      sourceName: 'อลูมิเนียม',
      unit: 'ชิ้น',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
      sourceName: 'อลูมิเนียม',
      sourceDesc: "John's Cardano Wallet",
      unit: '-',
      shelf: 'ตู้หมายเลข 1',
      floor: '1',
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
