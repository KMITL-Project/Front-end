import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { materialOrder } from '@/model/management/material';
import SetupShelfInfoTable from '@/content/setup/shelf/ShelfInfoTable';
import SetupMaterialInfoTable from '@/content/Management/material/MaterialInfoTable';
import { ShelfInfo } from '@/model/setup/shelfinfo';
import { MaterialInfo } from '@/model/management/materialInfo';
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
    Grid,
  } from '@mui/material';

import Link from 'next/link';

const MaterialInfoPage = () => {
  const router = useRouter();
  const { materialId } = router.query;
  const [selectedMaterial, setSelectedMaterial] = useState<materialOrder | null>(null);

  const mockupData: MaterialInfo[] = [
    // fix floorDate, floorAction
    {
        id: '1',
        status: 'completed',
        name: 'Material A',
        lot: '1',
        category: 'Category A',
        orderDate: new Date().getTime(),
        amount: 10,
        unit: 'kg',
        shelf: 'Shelf A',
        price: 300
      },
    {
        id: '2',
        status: 'pending',
        name: 'Material A',
        lot: '2',
        orderDate: new Date().getTime(),
        category: 'Category B',
        amount: 5,
        unit: 'pieces',
        shelf: 'Shelf B',
        price: 500
    },
  ];

  // Simulated function to fetch data based on materialId
  const fetchMaterialData = async (id: string) => {
    // Perform API request or data retrieval based on the id
    // For simulation purposes, you can use a setTimeout to mimic an API call
    // Replace this with your actual data fetching logic
    // Example: const response = await fetch(`/api/materials/${id}`);
    // const data = await response.json();
    const data: materialOrder[] = [
      // Simulated data
      {
        id: '1',
        status: 'completed',
        name: 'Material A',
        lot: '1',
        category: 'Category A',
        orderDate: new Date().getTime(),
        amount: 10,
        unit: 'kg',
        shelf: 'Shelf A',
        price: 300,
        description: " "
      },
      {
        id: '2',
        status: 'pending',
        name: 'Material A',
        lot: '2',
        orderDate: new Date().getTime(),
        category: 'Category B',
        amount: 5,
        unit: 'pieces',
        shelf: 'Shelf B',
        price: 500,
        description: " "
      },
      // Add more simulated data as needed...
    ];

    // Find the materialOrder based on the provided id
    const selected = data.find((material) => material.id === id);
    return selected || null;
  };

  useEffect(() => {
    if (materialId && typeof materialId === 'string') {
      fetchMaterialData(materialId).then((data) => {
        setSelectedMaterial(data);
      });
    }
  }, [materialId]);

  if (!selectedMaterial) {
    // Loading state or handle if the material data is not found
    return <div>Loading...</div>;
  }

  return (
    <>
        <Card>
            <CardContent>
                <Grid container spacing={3} justifyContent="center">
                    {/* Column 1 - Label */}
                    <Grid item xs={12} sm={4}>
                        {/* Display uploaded image */}
                        <Grid container justifyContent="center" alignItems="center" className="mb-2 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg bg-gray-50">
                            <img src="/path/to/your/image.jpg" alt="Uploaded Image" className="max-h-48 max-w-full" />
                        </Grid>
                        <Typography variant="caption" color="textSecondary" align="center" className="text-base text-gray-500 leading-loose">
                            ID: {selectedMaterial.id} 
                            <br /> Name: {selectedMaterial.name}
                            <br /> Category: {selectedMaterial.category}
                            <br /> Amount: {selectedMaterial.amount}
                            <br /> Unit: {selectedMaterial.unit}
                            <br /> Shelf: {selectedMaterial.shelf}
                        </Typography>
                    </Grid>
                    {/* Column 2 - Form */}
                    <Grid item xs={12} sm={7}>
                        <SetupMaterialInfoTable MaterialInfos={mockupData}/>
                    </Grid>
                </Grid>
                {/* Button Row */}
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/management/material" passHref>
                            <Button variant="contained" sx={{ margin:1}}
                                disableRipple
                                component="a"
                            >
                                Back
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </>
  );
};

export default MaterialInfoPage;
