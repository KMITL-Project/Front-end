import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
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
} from '@mui/material';

interface Material {
  value: string;
  label: string;
}

const users: Material[] = [
  {
    value: 'User 1',
    label: 'User 1',
  },
  {
    value: 'User 2',
    label: 'User 2',
  },
  {
    value: 'User 3',
    label: 'User 3',
  },
];

const materials: Material[] = [
  {
    value: 'Material 1',
    label: 'Material 1',
  },
  {
    value: 'Material 2',
    label: 'Material 2',
  },
  {
    value: 'Material 3',
    label: 'Material 3',
  },
];

const Pickup: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedMaterialInfo, setSelectedMaterialInfo] = useState<{ amount: number; unit: string }>({
    amount: 0,
    unit: '',
  });

  const handleMaterialChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedMaterial(value);
    const materialInfo = filteredMaterials.find((material) => material.value === value);
    if (materialInfo) {
      setSelectedMaterialInfo({ amount: materialInfo.amount, unit: materialInfo.unit });
    } else {
      setSelectedMaterialInfo({ amount: 0, unit: '' });
    }
  };

  const router = useRouter();

  const filteredMaterials = [
    {
      value: 'Material 1',
      label: 'Material 1',
      amount: 500,
      unit: 'kg',
    },
    {
      value: 'Material 2',
      label: 'Material 2',
      amount: 750,
      unit: 'units',
    },
    {
      value: 'Material 3',
      label: 'Material 3',
      amount: 300,
      unit: 'units',
    },
  ];

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth className="mb-4">
                <InputLabel id="material-label">Material</InputLabel>
                <Select
                  labelId="material-label"
                  id="outlined-select-material"
                  value={selectedMaterial}
                  onChange={handleMaterialChange}
                  label="Material" // ใส่ label ไว้ที่นี่
                  defaultValue=""
                >
                  <MenuItem value="">Select Material</MenuItem>
                  {materials.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                className="mb-4"
                id="outlined-amount"
                label="Amount"
                value={`${selectedMaterialInfo.amount} ${selectedMaterialInfo.unit}`}
                disabled
              />
              <TextField
                required
                fullWidth
                className="mb-4"
                id="outlined-price"
                label="Price"
                defaultValue=""
              />
              <TextField
                required
                fullWidth
                className="mb-4"
                id="outlined-description"
                label="Description"
                defaultValue=""
              />
              <FormControl fullWidth className="mb-4">
                <InputLabel id="user-label">User</InputLabel>
                <Select 
                  labelId="user-label" 
                  id="outlined-select-user" 
                  label="Material" // ใส่ label ไว้ที่นี่
                  defaultValue=""
                  >
                  {users.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Column 3 - Upload */}
            <Grid item xs={12} sm={4} container justifyContent="center" alignItems="center" className="ml-5">
              <Grid container justifyContent="center" alignItems="center" className="mb-2 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg bg-gray-50">
                  <img src="/path/to/your/image.jpg" alt="Uploaded Image" className="max-h-48 max-w-full" />
              </Grid>
            </Grid>
          </Grid>
          
          {/* Button Row */}
          <Grid container justifyContent="flex-end">
              <Grid item>
                  <Button
                      variant="contained"
                      sx={{ margin: 1 }}
                      disableRipple
                      component="a"
                      onClick={() => router.push('/management/material')}
                  >
                      Cancel
                  </Button>
              </Grid>
              <Grid item>
                  <Button 
                      variant="contained" 
                      sx={{ margin:1}}
                      disableRipple
                      color="error"
                      component="a"
                      onClick={() => router.push('/management/material')}
                  >
                      Save
                  </Button>
              </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Pickup;
