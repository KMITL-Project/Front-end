import { Card } from '@mui/material';
import { CryptoOrder } from '@/model/logsitic/crypto_order';
import RecentOrdersTable from './CustomerListTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'completed',
      orderID: 'VUVX709ET7BY',
      sourceName: 'Rose',
      sourceDesc: 'ประตู',
      amountCrypto: 34.4565,
      amount: 56787,
      cryptoCurrency: 'ลาดกระบัง',
      currency: '$'
    },
    {
      id: '2',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      orderID: '23M3UOG65G8K',
      sourceName: 'Jack Dawson',
      sourceDesc: 'รั้ว',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'หนองจอก',
      currency: '$'
    },
    {
      id: '3',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      orderID: 'F6JHK65MS818',
      sourceName: 'Billy',
      sourceDesc: 'บานเลื่อน',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'อ่อนนุช',
      currency: '$'
    },
    {
      id: '4',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      orderID: 'QJFAI7N84LGM',
      sourceName: 'Max',
      sourceDesc: 'ประตู',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'บางนา',
      currency: '$'
    },
    {
      id: '5',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      orderID: 'BO5KFSYGC0YW',
      sourceName: 'Bob',
      sourceDesc: 'รั้ว',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'พญาไท',
      currency: '$'
    },
    {
      id: '6',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      orderID: '6RS606CBMKVQ',
      sourceName: 'John',
      sourceDesc: 'บานเลื่อน',
      amountCrypto: 6.58454334,
      amount: 8734587,
      cryptoCurrency: 'ราชเทวี',
      currency: '$'
    },
    {
      id: '7',
      orderDetails: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'pending',
      orderID: '479KUYHOBMJS',
      sourceName: 'Paul',
      sourceDesc: 'ประตู',
      amountCrypto: 2.346546,
      amount: 234234,
      cryptoCurrency: 'รามคำแหง',
      currency: '$'
    },
    {
      id: '8',
      orderDetails: 'Paypal Withdraw',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      orderID: 'W67CFZNT71KR',
      sourceName: 'Kim',
      sourceDesc: 'รั้ว',
      amountCrypto: 3.345456,
      amount: 34544,
      cryptoCurrency: 'บางพลี',
      currency: '$'
    },
    {
      id: '9',
      orderDetails: 'Fiat Deposit',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      orderID: '63GJ5DJFKS4H',
      sourceName: 'Park',
      sourceDesc: 'บานเลื่อน',
      amountCrypto: 1.4389567945,
      amount: 123843,
      cryptoCurrency: 'บึงกุ่ม',
      currency: '$'
    },
    {
      id: '10',
      orderDetails: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      orderID: '17KRZHY8T05M',
      sourceName: 'Ellen',
      sourceDesc: "ประตู",
      amountCrypto: 765.5695,
      amount: 7567,
      cryptoCurrency: 'บางแค',
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
