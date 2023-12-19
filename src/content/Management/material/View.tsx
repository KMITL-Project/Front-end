import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { cryptoOrders } from './RecentOrders;' // นำเข้าข้อมูล Order จากไฟล์ที่เก็บข้อมูลจำลอง
import { CryptoOrder, CryptoOrderStatus } from '@/config/management/shelf';

const ViewOrder = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderData, setOrderData] = useState<cryptoOrder | null>(null);

  useEffect(() => {
    const fetchDataOrder = () => {
      const selectedOrder = cryptoOrders.find((cryptoOrder) => cryptoOrder.id === id); // ค้นหา Order จาก cryptoOrders ตาม ID ที่ได้รับ

      if (selectedOrder) {
        setOrderData(selectedOrder);
      }
    };

    if (id) {
      fetchDataOrder();
    }
  }, [id]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  // ต่อไปนี้คือโค้ดส่วนแสดงข้อมูลของคำสั่ง
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <p>
            <span className="font-semibold">Order ID:</span> {orderData.id}
          </p>
          {/* แสดงข้อมูลอื่น ๆ ของคำสั่งตามต้องการ */}
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
