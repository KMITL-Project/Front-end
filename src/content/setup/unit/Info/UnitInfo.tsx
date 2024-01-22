import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement, useState, FC, useEffect, } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { useRouter } from 'next/router';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

interface EditUnitProps {}

const InfoUnit: FC<EditUnitProps> = () => {
    const router = useRouter();
    const { unitId } = router.query;
    // ตรวจสอบค่า id ที่ได้
    // console.log('router:', router);
    // console.log('ID:', unitId);
  
    const [unitData, setUnitData] = useState<any>({
      name: '',
      detail: '',
      // และข้อมูลอื่น ๆ ที่คุณต้องการแสดงและแก้ไข
    });
  
    useEffect(() => {
        if (unitId) {
          const fetchData = async () => {
            try {
              const token = localStorage.getItem('accessToken');
              if (token) {
                const response = await fetch(`${publicRuntimeConfig.BackEnd}unit/${unitId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });
                if (response.ok) {
                  const responseData = await response.json();
                  if (responseData && responseData.data) {
                    setUnitData(responseData.data);
                  } else {
                    console.error('Invalid data format from API');
                  }
                } else if (response.status === 401) {
                  // Token หมดอายุหรือไม่ถูกต้อง
                  console.log('Token expired or invalid');
                  // ทำการลบ token ที่หมดอายุจาก localStorage
                  localStorage.removeItem('accessToken');
                } else {
                  console.error('Failed to fetch unit data');
                }
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
      
          fetchData(); // เรียก fetchData เมื่อ Component ถูก Mount
        }
      }, [unitId]);

    if (!unitId) {
        return <div>Loading...</div>;
    }

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
                            <CardHeader title="Unit Info" />
                            <Divider />
                            <CardContent>
                              <Grid container spacing={3} justifyContent="center">
                                <Grid item xs={12} sm={6} className="mt-5">
                                    <TextField
                                        required
                                        fullWidth
                                        label="Unit Name"
                                        className="mb-4" 
                                        variant="outlined"
                                        value={unitData.name}
                                        InputProps={{ readOnly: true }}
                                        // onChange={(e) => setUnitData({ ...unitData, name: e.target.value })}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        label="Unit Detail"
                                        className="mb-4" 
                                        variant="outlined"
                                        value={unitData.detail}
                                        InputProps={{ readOnly: true }}
                                        // onChange={(e) => setUnitData({ ...unitData, detail: e.target.value })}
                                    />
                                    </Grid>
                                    <Grid container justifyContent="flex-end">
                                        <Button
                                            // type="submit"
                                            variant="contained" 
                                            sx={{ margin:1}}
                                            onClick={() => router.push('/setup/unit/')}
                                            disableRipple
                                            component="a"

                                            >Back
                                            {" "}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

// EditUnit.getLayout = (page : ReactElement) => <SidebarLayout>{page}</SidebarLayout>;
export default InfoUnit;
