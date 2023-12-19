import { Card } from '@mui/material';
import { materialOrder } from '@/model/management/material';
import RecentOrdersTable from './MaterialTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const materialOrders: materialOrder[] = [
    {
      id: '1',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '2',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '3',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '4',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '5',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '6',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '7',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '8',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '9',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    },
    {
      id: '10',
      name: 'เหล็กเส้น',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable materialOrders={materialOrders} />
    </Card>
  );
}

export default RecentOrders;
