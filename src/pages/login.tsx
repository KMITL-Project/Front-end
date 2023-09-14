// pages/login.tsx
import React from 'react';
import LoginForm from '../components/LogIn/LoginForm';

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
