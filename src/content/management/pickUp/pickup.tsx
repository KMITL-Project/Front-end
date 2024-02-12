import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement, useState, useEffect } from "react";
import { SelectChangeEvent } from '@mui/material';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CardHeader,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/router';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Pickup: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    material_id: "",
    amount: "",
    // buy_date: ""
  });

  const [cryptoOrders, setCryptoOrders] = useState([]);

  useEffect(() => {
    const fetchFloorData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const response = await fetch(`${publicRuntimeConfig.BackEnd}material`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const responseData = await response.json();
            setCryptoOrders(responseData.data.map(material => ({value: material.id, label: material.name})));
          } else if (response.status === 401) {
            console.log('Token expired or invalid');
            localStorage.removeItem('accessToken');
          } else {
            console.error('Failed to fetch data. Response:', response);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };    
  
    fetchFloorData();
  }, []); 

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    const formDataToSend = new FormData();
    formDataToSend.append('material_id', formData.material_id);
    formDataToSend.append('amount', formData.amount);

    try {
      if (token) {
        const response = await fetch(`${publicRuntimeConfig.BackEnd}lot/withdraw`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend,
        });
        console.log('formData:', formDataToSend);
        console.log('material_id:', formDataToSend.get('material_id'));
        console.log('amount:', formDataToSend.get('amount'));
        if (response.ok) {
          // console.log('name:', formDataToSend.get('name'));
          const responseData = await response.json();
          // const uploadedImageUrl = responseData.imageUrl;
          // setImageUrl(uploadedImageUrl);
          // ดำเนินการหลังจากการสร้าง Unit สำเร็จ
          console.log('Material Withdraw successfully!');
          router.push('/management/material/');
        } else if (response.status === 401) {
          // Token หมดอายุหรือไม่ถูกต้อง
          console.log('Token expired or invalid');
          // ทำการลบ token ที่หมดอายุจาก localStorage
          localStorage.removeItem('accessToken');
        } else {
          // ถ้าการสร้าง Unit ไม่สำเร็จ
          console.error('Material Withdraw failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event, id) => {
    const { value } = event.target;
  
    if (id === "material_id") {
      setFormData({
        ...formData,
        material_id: value
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Card>
        <CardHeader title="Withdraw Material" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                className="mb-4" 
                id="material_id"
                label="Material"
                value={formData.material_id}
                onChange={(e) => handleChange(e, "material_id")}
                select
                >
                {cryptoOrders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                fullWidth
                className="mb-4" 
                id="amount"
                label="Amount"
                value={formData.amount}
                onChange={(e) => handleChange(e, "amount")}
              />
            </Grid>
            {/* Column 3 - Upload */}
            {/* <Grid item xs={12} sm={4} container justifyContent="center" alignItems="center" className="ml-5">
              <Grid container justifyContent="center" alignItems="center" className="mb-2 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg bg-gray-50">
                  <img src="/path/to/your/image.jpg" alt="Uploaded Image" className="max-h-48 max-w-full" />
              </Grid>
            </Grid> */}
          </Grid>
          <form onSubmit={handleCreate} encType="multipart/form-data">
            <Grid container justifyContent="flex-end" className="mt-5">
              <Button variant="contained" 
                sx={{ margin:1}}
                disableRipple
                component="a"
                // type="submit"
                onClick={handleCreate}
                >
                  Withdraw
              </Button>
              <Button variant="contained" 
                sx={{ margin:1}}
                disableRipple
                color="error"
                component="a"
                onClick={() => router.push('/management/material')}
              >
                  Cancel
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Pickup;
