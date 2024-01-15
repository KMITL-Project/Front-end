import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Box,
  Container,
} from '@mui/material';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import getConfig from "next/config";
import Image from 'next/image';
const { publicRuntimeConfig } = getConfig();
const queryClient = new QueryClient();

function SignUp() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Full_name: data.get('Full_name'),
        username: data.get('username'),
        password: data.get('password'),
      }),
    };

    try {
      const response = await fetch(`${publicRuntimeConfig.BackEnd}auth/register`, userData);
      if (response.ok) {
        // ดำเนินการหลังจากการเรียก API ที่สำเร็จ
        router.push('/'); // ไปยังหน้าที่ต้องการหลังจาก Sign Up สำเร็จ
        console.log('Signed up successfully!');
      } else {
        // ถ้าการเรียก API ไม่สำเร็จ
        console.error('Sign up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center min-h-screen">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="mt-8 p-8 bg-white rounded-md shadow-md">
            <div className="flex flex-col items-center">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form className="mt-1 w-full" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Full_name"
                  label="Full Name"
                  name="Full_name"
                  autoComplete="Full_name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Email / Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Grid container  className="mt-1">
                  {selectedFile && (
                    <div className="mt-3">
                      <Typography variant="body1">Uploaded Image:</Typography>
                      <Image
                        src={`/images/${selectedFile.name}`} // Assuming the file is uploaded to the 'images' folder inside the 'public' directory
                        alt="Uploaded"
                        layout="responsive"
                        width={800}
                        height={400}
                      />
                    </div>
                  )}
                  <input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="upload-image">
                    <Button
                      variant="outlined"
                      component="span"
                      className="mt-3 mb-2"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  className="mt-3 mb-2"
                  onClick={() => router.push('/')}
                >
                  Register
                </Button>
                <Grid
                  container
                  justifyContent="center"
                  className="mt-5"
                  sx={{ borderTop: '2px solid #ccc', paddingTop: '15px' }}
                >
                  <Grid item>
                    <Typography 
                      variant="body2"
                      color="primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => router.push('/auth/login')}
                      >
                      {"Already have an account? Login"}
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Box>
        </Container>
      </div>
    </QueryClientProvider>
  );
}
export default SignUp;