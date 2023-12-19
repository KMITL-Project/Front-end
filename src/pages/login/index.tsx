// pages/login.tsx
import React from 'react';
import LoginForm from '../../components/Authen/LoginForm';
import { Container, Grid } from "@mui/material";

const LoginPage: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    // Implement your login logic here
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
    
  );
};

export default LoginPage;