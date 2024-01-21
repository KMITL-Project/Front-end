import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from 'next/router';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function Forms() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "เครื่องมืองานเหล็ก",
    description: "ใช้สำหรับงานเหล็ก",
  });
  const handleCreateUnit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget); // ใช้ event.currentTarget เพื่อให้ได้ form element ที่ถูกต้อง
    const token = localStorage.getItem('accessToken');
    const requestData = {
      method: 'POST', // หรือ 'GET', 'PUT', 'DELETE' ตามที่ต้องการ
      headers: {
        'Content-Type': 'application/json', // กำหนด Content-Type ตาม API ของคุณ
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: formData.name, // ใช้ 'username' เนื่องจากชื่อฟิลด์ในฟอร์มคือ 'username'
        detail: formData.description,
      }),
    };
    try {
      if (token) {
        const response = await fetch(`${publicRuntimeConfig.BackEnd}unit`, requestData);
        if (response.ok) {
          // ดำเนินการหลังจากการสร้าง Unit สำเร็จ
          console.log('Unit created successfully!');
          router.push('/setup/unit/');
        } else if (response.status === 401) {
          // Token หมดอายุหรือไม่ถูกต้อง
          console.log('Token expired or invalid');
          // ทำการลบ token ที่หมดอายุจาก localStorage
          localStorage.removeItem('accessToken');
        } else {
          // ถ้าการสร้าง Unit ไม่สำเร็จ
          console.error('Unit creation failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  const [currency, setCurrency] = useState("EUR");

  const [value, setValue] = useState(30);

  const handleChange2 = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
        <Grid 
          item xs={10}
          direction="column"
          justifyContent="center"
        >    
        <Card>
          <CardHeader title="Create Unit" />
          <Divider />
          <CardContent>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "60ch" },
              }}
              noValidate
              autoComplete="off"
            >
            <div>
              <TextField
                required
                id="name"
                label="Unit Name"
                defaultValue={formData.name}
                onChange={handleChange}
              />

              <TextField
                required
                id="description"
                label="Unit Description"
                defaultValue={formData.description}
                onChange={handleChange}
              />
            
              <Grid container justifyContent="flex-end">
                <Button
                  // type="submit"
                  variant="contained" 
                  sx={{ margin:1}}
                  onClick={handleCreateUnit}
                  disableRipple
                  component="a"

                >Create
                  {" "}
                </Button>
                <Button
                  variant="contained" 
                  sx={{ margin:1}}
                  color="error"
                  onClick={() => router.push('/setup/unit/')}
                  disableRipple
                  component="a"
                >
                  Cancel{" "}
                </Button>
              </Grid>
            </div>
            </Box>
          </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Forms.getLayout = (page : ReactElement) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
