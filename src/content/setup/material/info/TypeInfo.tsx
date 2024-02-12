import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, FC, useState } from 'react';
import { materialOrder } from '@/model/management/material';
import SetupMaterialInfoTable from '@/content/management/material/info/MaterialInfoTable';
import { MaterialInfo } from '@/model/management/materialInfo';
import {
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    Container,
    CardHeader,
    Divider,
    TextField,
  } from '@mui/material';
import { format } from 'date-fns';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

interface EditUnitProps {}

const MaterialInfoPage: FC<EditUnitProps> = () => {
  const router = useRouter();
  const { materialId } = router.query;
  const [materialData, setmaterialData] = useState<any>({
    id: '',
    name: '',
    detail: '',
    unit_id: '',
    total: '',
    floor_id: '',
    image_url: '',
    created_at: '',
  });
  const [floorOptions, setFloorOptions] = useState([]); // State to store floor options
  const [unitOptions, setUnitOptions] = useState([]);
  
  useEffect(() => {
    if (materialId) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('accessToken');
          if (token) {
            const response = await fetch(`${publicRuntimeConfig.BackEnd}material/${materialId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
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
            if (response.ok && responseFloor.ok && responseUnit.ok) {
              const responseData = await response.json();
              const responseDataFloor = await responseFloor.json();
              const responseDataUnit = await responseUnit.json();
              console.log('ok', responseData);
              if (responseData && responseData.data) {
                setmaterialData(responseData.data);
                setFloorOptions(responseDataFloor.data.map(floor => ({ value: floor.id, label: floor.name })));
                setUnitOptions(responseDataUnit.data.map(unit => ({ value: unit.id, label: unit.name })));
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
  }, [materialId]);

if (!materialId) {return <div>Loading...</div>;}
  
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
              <CardHeader title="Material Type Info"/>
              <Divider />
              <CardContent>
                <Grid container spacing={3} justifyContent="center">
                  {/* Column 1 - Label */}
                  <Grid item xs={12} sm={4}>
                    {/* Display uploaded image */}
                    <Grid container justifyContent="center" alignItems="center" className="mb-5 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg bg-gray-50">
                        <img src="/path/to/your/image.jpg" alt="Uploaded Image" className="max-h-48 max-w-full" />
                    </Grid>
                  </Grid>
                  {/* Column 2 - Form */}
                  <Grid item xs={12} sm={7}>
                  <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="ID"
                      variant="outlined"
                      value={materialData.id}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Name"
                      variant="outlined"
                      value={materialData.name}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Detial"
                      variant="outlined"
                      value={materialData.detail}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Unit"
                      variant="outlined"
                      value={unitOptions.find(unit => unit.value === materialData.unit_id)?.label || ''}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Floor"
                      variant="outlined"
                      value={floorOptions.find(floor => floor.value === materialData.floor_id)?.label || ''}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Date"
                      variant="outlined"
                      value={materialData.created_at ? format(new Date(materialData.created_at), 'yyyy-MM-dd') : ''}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
                {/* Button Row */}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Button 
                        variant="contained" 
                        sx={{ margin:1}}
                        disableRipple
                        component="a"
                        onClick={() => router.push('/setup/materialtype')}
                      >Back
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

export default MaterialInfoPage;