import { Card } from '@mui/material';
import { Order } from '@/model/order';
import RecentOrdersTable from './ShelfTable';
import { subDays } from 'date-fns';
import SetupShelfInfoTable from './ShelfInfoTable';
import { ShelfInfo } from '@/model/setup/shelfinfo';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


function SetupShelfInfo() {
  const mockupData: ShelfInfo[] = [
    // fix floorDate, floorAction
    { id: 1, floorId: 1, floorName: 'Floor 1',  floorDescription: 'น็อต', floorDate: 200423, floorAction:'' },
    { id: 2, floorId: 2, floorName: 'Floor 2', floorDescription: 'สกรู', floorDate: 210523, floorAction:'' },
    { id: 3, floorId: 3, floorName: 'Floor 3', floorDescription: 'น็อต', floorDate: 220423, floorAction:'' },
    { id: 4, floorId: 4, floorName: 'Floor 4', floorDescription: 'ไขควง', floorDate: 230423, floorAction:'' },
    { id: 5, floorId: 5, floorName: 'Floor 5', floorDescription: 'ประแจ', floorDate: 240423, floorAction:'' },
    { id: 6, floorId: 6, floorName: 'Floor 6', floorDescription: 'น็อต 0.5', floorDate: 250423, floorAction:'' },
    { id: 7, floorId: 7, floorName: 'Floor 7', floorDescription: 'สกรู 0.5', floorDate: 260423, floorAction:'' },
    { id: 8, floorId: 8, floorName: 'Floor 8', floorDescription: 'ไขควง 0.5', floorDate: 270423, floorAction:'' },
    { id: 9, floorId: 9, floorName: 'Floor 9', floorDescription: 'ประแจ 0.5', floorDate: 280423, floorAction:'' },
    // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 34 },
    // { id: 6, lastName: 'Melisandre', firstName: 'Marquez', age: 150 },
    // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // Add more objects as needed
  ];

  return (
    // <Card>
      <SetupShelfInfoTable cryptoOrders={mockupData}/>
  );
}

export default SetupShelfInfo;
