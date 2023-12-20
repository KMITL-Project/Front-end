import React from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Card,
    CardContent,
    MenuItem,
    TextField,
    Grid,
  } from '@mui/material';

  const user = [
    {
        value: "User 1",
        label: "User 1",
    },
    {
        value: "User 2",
        label: "User 2",
    },
    {
        value: "User 3",
        label: "User 3",
    },
  ];
  
  const material = [
    {
      value: "Material 1",
      label: "Material 1",
    },
    {
      value: "Material 2",
      label: "Material 2",
    },
    {
      value: "Material 3",
      label: "Material 3",
    },
  ];

function MaterialAdd() {

    const router = useRouter();

    const handleCancel = () => {
        router.push('/management/material');
    };
  
    const handleSave = () => {
        router.push('/management/material');
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={3} justifyContent="center">

                        {/* Column 1 - Form */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth className="mb-4"
                                id="outlined-select-currency"
                                select
                                label="Material"
                                defaultValue=" "
                                >
                                {material.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                fullWidth
                                className="mb-4" 
                                id="outlined-required"
                                label="Amount"
                                defaultValue=" "
                                />
                            {/* </TextField> */}
                            <TextField
                                required
                                fullWidth 
                                className="mb-4" 
                                id="outlined-required"
                                label="Price"
                                defaultValue=" "
                                />
                            <TextField
                                required
                                fullWidth className="mb-4" 
                                id="outlined-required"
                                label="Description"
                                defaultValue=" "
                                />
                            <TextField
                                required
                                fullWidth className="mb-4"
                                id="outlined-select-currency"
                                select
                                label="User"
                                defaultValue=" "
                                >
                                {user.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Column 2 - Upload */}
                        <Grid item xs={12} sm={4} container justifyContent="center" alignItems="center" className="ml-5">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-violet-600">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
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
                                onClick={handleCancel}
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
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default MaterialAdd;