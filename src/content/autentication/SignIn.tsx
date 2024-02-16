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
import { useQuery} from 'react-query';
import getConfig from "next/config";
import { useMutation } from 'react-query';
import { QueryClient, QueryClientProvider } from "react-query";

const { publicRuntimeConfig } = getConfig();
const queryClient = new QueryClient();

function SignIn() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestData = {
      method: 'POST', // หรือ 'GET', 'PUT', 'DELETE' ตามที่ต้องการ
      headers: {
        'Content-Type': 'application/json', // กำหนด Content-Type ตาม API ของคุณ
      },
      body: JSON.stringify({
        username: data.get('username'), // ใช้ 'username' เนื่องจากชื่อฟิลด์ในฟอร์มคือ 'username'
        password: data.get('password'),
      }),
    };
  
    try {
      const response = await fetch(`${publicRuntimeConfig.BackEnd}auth/login`, requestData);
      if (response.ok) {
        const responseData = await response.json();
    
        if (responseData.errors && responseData.errors.length > 0) {
          // มีข้อผิดพลาด
          console.error('API returned errors:', responseData.errors);
    
          // สามารถทำการจัดการกับข้อผิดพลาดได้ตามต้องการ
          // responseData.errors.forEach(error => {
          //   console.error('Type:', error.type);
          //   console.error('Message:', error.msg);
          //   console.error('Path:', error.path);
          //   console.error('Location:', error.location);
          // });
        } else {
          // ไม่มีข้อผิดพลาด
          console.log('Login successful:', responseData);
          const token = responseData.data.token;
          localStorage.setItem('accessToken', token);
          console.log('Received token:', token);
          router.push('/'); // Redirect after successful login
          // สามารถทำตามที่คุณต้องการเมื่อ login สำเร็จ
        }
      } else {
        console.error('Error in API response:', response.status, response.statusText);
        // สามารถทำตามที่คุณต้องการในส่วนนี้ เช่น แสดงข้อความผลลัพธ์ที่ไม่สำเร็จ, แสดง form กรอกข้อมูลใหม่, หรือทำการ redirect หรือ refresh หน้า
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="mt-8 p-8 bg-white rounded-md shadow-md">
          <div className="flex flex-col items-center">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className="mt-1 w-full" onSubmit={handleSubmit} noValidate>
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
              <Grid container justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Typography
                  variant="body2"
                  color="primary"
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push('/forgotPassword')}
                >
                  Forgot password?
                </Typography>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                className="mt-3 mb-2"
                // onClick={() => router.push('/')}
              >
                Login
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
                    onClick={() => router.push('/auth/register')}
                    >
                    {"Don't have an account? Register"}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    </div>
  );
}
export default SignIn;