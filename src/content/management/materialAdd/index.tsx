import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  CardHeader,
  Divider,
  MenuItem
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from 'next/router';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function Forms() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // เพิ่ม state สำหรับเก็บ URL ของรูป
  const [formData, setFormData] = useState({
    image: imageUrl,
    name: "ชั้นเครื่องมือ",
    detail: "ประแจ",
    total: "100",
    floor_id: "",  // เปลี่ยนนี้
    unit_id: "",

  });

  const [floorOptions, setFloorOptions] = useState([]); // State to store floor options
  const [unitOptions, setUnitOptions] = useState([]);
  
  useEffect(() => {
    const fetchFloorData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const responseFloor = await fetch(`${publicRuntimeConfig.BackEnd}floor`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const responseUnit = await fetch(`${publicRuntimeConfig.BackEnd}unit`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (responseFloor.ok && responseUnit.ok) {
            const responseDataFloor = await responseFloor.json();
            const responseDataUnit = await responseUnit.json();
            console.log('Floor Data:', responseDataFloor.data);
            setFloorOptions(responseDataFloor.data.map(floor => ({ value: floor.id, label: floor.name })));
            setUnitOptions(responseDataUnit.data.map(unit => ({ value: unit.id, label: unit.name })));
          } else if (responseFloor.status === 401 || responseUnit.status === 401) {
            console.log('Token expired or invalid');
            localStorage.removeItem('accessToken');
          } else {
            console.error('Failed to fetch floor or unit data. Response:', responseFloor, responseUnit);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };    
  
    fetchFloorData();
  }, []);  

  const handleCreateUnit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('image_url', file);  // แนบรูปภาพ
    formDataToSend.append('detail', formData.detail);
    formDataToSend.append('floor_id', formData.floor_id);
    formDataToSend.append('total', formData.total);
    formDataToSend.append('unit_id', formData.unit_id);

    try {
      if (token) {
        const response = await fetch(`${publicRuntimeConfig.BackEnd}material`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend,
        });
        console.log('formData:', formDataToSend);
        console.log('name:', formDataToSend.get('name'));
        console.log('detail:', formDataToSend.get('detail'));
        console.log('floor_id:', formDataToSend.get('floor_id'));
        console.log('total:', formDataToSend.get('total'));
        console.log('unit_id:', formDataToSend.get('unit_id'));
        if (response.ok) {
          // console.log('name:', formDataToSend.get('name'));
          // console.log('detail:', formDataToSend.get('detail'));
          const responseData = await response.json();
          const uploadedImageUrl = responseData.imageUrl;
          setImageUrl(uploadedImageUrl);
          // ดำเนินการหลังจากการสร้าง Unit สำเร็จ
          console.log('Unit created successfully!');
          router.push('/');
        } else if (response.status === 401) {
          // Token หมดอายุหรือไม่ถูกต้อง
          console.log('Token expired or invalid');
          // ทำการลบ token ที่หมดอายุจาก localStorage
          localStorage.removeItem('accessToken');
        } else {
          // ถ้าการสร้าง Unit ไม่สำเร็จ
          console.error('Material creation failed');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    
    if (id === "floor_id") {
      const selectedFloor = floorOptions.find((floor) => floor.id === value);
      setFormData({
        ...formData,
        floor_id: selectedFloor ? selectedFloor.id : "",
      });
    } else if (id === "unit_id") {
      const selectedUnit = unitOptions.find((unit) => unit.id === value);
      setFormData({
        ...formData,
        unit_id: selectedUnit ? selectedUnit.id : "",
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };
  
  const handleFileChange = (event) => {
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
        <CardHeader title="Create Material" />
        <Divider />
          <CardContent>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} className="mt-5">
                  <TextField
                    required
                    fullWidth
                    className="mb-4" 
                    id="name"
                    label="Material Name"
                    defaultValue={formData.name}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    className="mb-4" 
                    id="detail"
                    label="Material Detail"
                    defaultValue={formData.detail}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    className="mb-4" 
                    id="total"
                    label="Material Total"
                    defaultValue={formData.total}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    className="mb-4" 
                    id="floor_id"
                    label="Floor"
                    value={formData.floor_id}
                    onChange={handleChange}
                    select
                    >
                    {floorOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required
                    fullWidth
                    className="mb-4" 
                    id="unit_id"  // ตรวจสอบว่า id ถูกต้อง
                    label="Unit"
                    value={formData.unit_id}
                    onChange={handleChange}
                    select
                    >
                    {unitOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
}

Forms.getLayout = (page: ReactElement) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
