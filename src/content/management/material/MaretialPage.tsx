import { Card } from '@mui/material';
import { materialOrder } from '@/model/management/material';
import RecentOrdersTable from './MaterialTable';
import { subDays } from 'date-fns';

function MaterialOrders() {
  const materialOrders: materialOrder[] = [
    {     
      id: '1',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '2',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '3',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '4',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '5',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '6',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '7',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '8',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '9',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    },
    {
      id: '10',
      status: 'completed',
      name: 'เหล็กเส้น',
      lot: '1',
      orderDate: subDays(new Date(), 1).getTime(),
      category: 'เหล็ก',
      amount: 1000,
      unit: 'ชิ้น',
      shelf: 'ตู้เก็บของ 1',
      price: 300,
      description: 'string',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable materialOrders={materialOrders} />
    </Card>
  );
}

export default MaterialOrders;