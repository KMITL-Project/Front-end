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

export default function SignIn() {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              Sign in
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
                onClick={() => router.push('/')}
              >
                Sign In
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
                    onClick={() => router.push('/signup')}
                    >
                    {"Don't have an account? Sign Up"}
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
