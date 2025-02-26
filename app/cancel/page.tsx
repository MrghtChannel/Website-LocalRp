'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const Cancel = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');  
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <span className="text-8xl text-red-600 mb-4">❌</span> 
      <h1 className="text-4xl font-bold text-red-700 mb-4">Ваш платіж було скасовано</h1>
      <p className="text-lg text-gray-700">Якщо це була помилка, спробуйте ще раз або зверніться в підтримку.</p>
    </div>
  );
};

export default Cancel;
