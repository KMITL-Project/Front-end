import { Card } from "@mui/material";
// import { Order,Ordertatus } from '@/model/logsitic/order.ts';

import RecentOrdersTable from "./StatusTable";
import { subDays } from "date-fns";
import { Tracking } from "@/model/logistic/tracking";

function RecentOrders() {
  const listOrders: Tracking[] = [
    {
      id: "1",
      shippingDate: new Date().getTime(),
      status: "completed",
      orderID: "VUVX709ET7BY",
      customerName: "Rose",
      productName: "ประตู",
      customerAddress: "ลาดกระบัง",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "2",
      shippingDate: subDays(new Date(), 1).getTime(),
      status: "completed",
      orderID: "23M3UOG65G8K",
      customerName: "Jack Dawson",
      productName: "รั้ว",
      customerAddress: "หนองจอก",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "3",
      shippingDate: subDays(new Date(), 5).getTime(),
      status: "failed",
      orderID: "F6JHK65MS818",
      customerName: "Billy",
      productName: "บานเลื่อน",
      customerAddress: "อ่อนนุช",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "4",
      shippingDate: subDays(new Date(), 55).getTime(),
      status: "completed",
      orderID: "QJFAI7N84LGM",
      customerName: "Max",
      productName: "ประตู",
      customerAddress: "บางนา",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "5",
      shippingDate: subDays(new Date(), 56).getTime(),
      status: "pending",
      orderID: "BO5KFSYGC0YW",
      customerName: "Bob",
      productName: "รั้ว",
      customerAddress: "พญาไท",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "6",
      shippingDate: subDays(new Date(), 33).getTime(),
      status: "completed",
      orderID: "6RS606CBMKVQ",
      customerName: "John",
      productName: "บานเลื่อน",
      customerAddress: "ราชเทวี",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "7",
      shippingDate: new Date().getTime(),
      status: "pending",
      orderID: "479KUYHOBMJS",
      customerName: "Paul",
      productName: "ประตู",
      customerAddress: "รามคำแหง",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "8",
      shippingDate: subDays(new Date(), 22).getTime(),
      status: "completed",
      orderID: "W67CFZNT71KR",
      customerName: "Kim",
      productName: "รั้ว",
      customerAddress: "บางพลี",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "9",
      shippingDate: subDays(new Date(), 11).getTime(),
      status: "completed",
      orderID: "63GJ5DJFKS4H",
      customerName: "Park",
      productName: "บานเลื่อน",
      customerAddress: "บึงกุ่ม",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
    {
      id: "10",
      shippingDate: subDays(new Date(), 123).getTime(),
      status: "failed",
      orderID: "17KRZHY8T05M",
      customerName: "Ellen",
      productName: "ประตู",
      customerAddress: "บางแค",
      detailStatus: "",
      orderDate: new Date().getTime(),
    },
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={listOrders} />
    </Card>
  );
}

export default RecentOrders;
