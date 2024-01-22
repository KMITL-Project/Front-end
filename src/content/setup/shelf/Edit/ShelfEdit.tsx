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
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import getConfig from "next/config";
import FloorTable from "@/content/setup/shelf/Floor/FloorTable"

const { publicRuntimeConfig } = getConfig();

interface EditUnitProps {}

const ShelfEdit: FC<EditUnitProps> = () => {
  const router = useRouter();
  const { shelfId } = router.query;
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // เพิ่ม state สำหรับเก็บ URL ของรูป
    // ตรวจสอบค่า id ที่ได้
    // console.log('router:', router);
    // console.log('ID:', shelfId);
  const [ShelfData, setShelfData] = useState<any>({
      name: '',
      detail: '',
      image_url: '',
    // และข้อมูลอื่น ๆ ที่คุณต้องการแสดงและแก้ไข
  });
  useEffect(() => {
      if (shelfId) {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('accessToken');
            if (token) {
              const response = await fetch(`${publicRuntimeConfig.BackEnd}shelf/${shelfId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.ok) {
                const responseData = await response.json();
                console.log('ok', responseData);
                if (responseData && responseData.data) {
                  setShelfData(responseData.data);
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
    }, [shelfId]);

  if (!shelfId) {
      return <div>Loading...</div>;
  }
  const handleUpdateShelf = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    const formDataToSend = new FormData();
    formDataToSend.append('image_url', file);  // แนบรูปภาพ
    formDataToSend.append('name', ShelfData.name);
    formDataToSend.append('detail', ShelfData.detail);
    try {
      if (token) {
        const response = await fetch(`${publicRuntimeConfig.BackEnd}shelf/${shelfId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend,
        });
        console.log('formData:', formDataToSend);
        if (response.ok) {
          console.log('name:', formDataToSend.get('name'));
          console.log('detail:', formDataToSend.get('detail'));
          const responseData = await response.json();
          const uploadedImageUrl = responseData.imageUrl;
          setImageUrl(uploadedImageUrl);
          // ดำเนินการหลังจากการสร้าง Unit สำเร็จ
          console.log('Unit created successfully!');
          router.push('/setup/shelf/');
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShelfData({ ...ShelfData, image_url: reader.result });
      };
      reader.readAsDataURL(selectedFile);
  
      setFile(selectedFile);
    }
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
                        <CardHeader title="Unit Edit" />
                        <Divider />
                        <CardContent>
                          <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12} sm={6} className="mt-10">
                                <TextField
                                    required
                                    fullWidth
                                    className="mb-5"
                                    label="Unit Name"
                                    variant="outlined"
                                    value={ShelfData.name}
                                    onChange={(e) => setShelfData({ ...ShelfData, name: e.target.value })}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    className="mb-5"
                                    label="Unit Detail"
                                    variant="outlined"
                                    value={ShelfData.detail}
                                    onChange={(e) => setShelfData({ ...ShelfData, detail: e.target.value })}
                                />
                              </Grid>
                              {/* Column 2 - Form */}
                              <Grid item xs={12} sm={4} className="mt-5">
                                {/* Display uploaded image */}
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  className="hidden"
                                  onChange={handleFileChange}
                                />
                              <Grid container justifyContent="center" alignItems="center" className="mt-5 mb-5 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg bg-gray-50">
                                  <img src={ShelfData.image_url} alt="Uploaded Image" className="max-h-48 max-w-full" />
                              </Grid>
                              <Button variant="contained" component="label" htmlFor="dropzone-file">
                                Upload Image
                              </Button>
                              </Grid>
                              <Grid container justifyContent="flex-end">
                                  <Button
                                      // type="submit"
                                      variant="contained" 
                                      sx={{ margin:1}}
                                      onClick={handleUpdateShelf}
                                      disableRipple
                                      component="a"

                                      >Update
                                      {" "}
                                  </Button>
                                  <Button
                                      variant="contained" 
                                      sx={{ margin:1}}
                                      color="error"
                                      onClick={() => router.push('/setup/shelf/')}
                                      disableRipple
                                      component="a"
                                      >
                                      Cancel{" "}
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
export default ShelfEdit;
