'use client';
import React from 'react'; 
import { useEffect, useState } from 'react';
import Login from '../pages/login';
import { useRouter } from 'next/navigation';


const MainPage: React.FC = () => {
   
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
      setIsAuthenticated(!!localStorage.getItem('access_token'));
      if (isAuthenticated) {
          router.push('/dashboard');
      }
  }, [router, isAuthenticated]);
  return (
      <Login />
  );
};

export default MainPage;
