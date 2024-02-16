import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  CardHeader,
  Divider,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from 'next/router';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function Forms() {
  const router = useRouter();
  const { shelfId } = router.query;
  console.log('Id:', shelfId);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // เพิ่ม state สำหรับเก็บ URL ของรูป
  const [formData, setFormData] = useState({
    image: imageUrl,
    name: "ชั้นเครื่องมือ",
    detail: "ประแจ",
  });

  const handleCreateUnit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    const formDataToSend = new FormData();
    formDataToSend.append('shelve_id', shelfId);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('image_url', file);  // แนบรูปภาพ
    formDataToSend.append('detail', formData.detail);
    
    try {
      if (token) {
        const response = await fetch(`${publicRuntimeConfig.BackEnd}floor`, {
          method: 'POST',
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

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      // ทำการอ่านไฟล์รูปภาพ
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
  
      setFile(selectedFile);  // เซ็ตค่า file ใน state
    }
  };

  return (
    <>
      <Head>
        <title></title>
      </Head>
        <Card>
        <CardHeader title="Create Floor" />
        <Divider />
          <CardContent>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} className="mt-5">
                  <TextField
                      required
                      fullWidth
                      className="mb-4" 
                      id="name"
                      label="Floor Name"
                      defaultValue={formData.name}
                      onChange={handleChange}
                      />
                  <TextField
                      required
                      fullWidth
                      className="mb-4" 
                      id="detail"
                      label="Floor detail"
                      defaultValue={formData.detail}
                      onChange={handleChange}
                  />
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {imageUrl && (
                    <img src={imageUrl} alt="Uploaded Image" className="w-300 h-300 justify-center" />
                  )}
                  <Button variant="contained" component="label" htmlFor="dropzone-file" className="mt-2">
                    Upload Image
                  </Button>
                </Grid>
              </Grid>
              {/* Button Row */}
              <form onSubmit={handleCreateUnit} encType="multipart/form-data">
              <Grid container justifyContent="flex-end" className="mt-5">
                <Button variant="contained" 
                  sx={{ margin:1}}
                  disableRipple
                  component="a"
                  // type="submit"
                  onClick={handleCreateUnit}
                  >
                    Create
                </Button>
                <Button variant="contained" 
                  sx={{ margin:1}}
                  disableRipple
                  color="error"
                  component="a"
                  onClick={() => router.push('/setup/shelf/')}
                >
                    Cancel
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
    </>
  );
}

Forms.getLayout = (page: ReactElement) => <SidebarLayout>{page}</SidebarLayout>;
export default Forms;
