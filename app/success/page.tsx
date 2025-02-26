'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

const Success = () => {
  const router = useRouter(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');  
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <span className="text-8xl text-blue-600 mb-4">✔️</span> 
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Ваш платіж був успішним!</h1>
      <p className="text-lg text-gray-700">Дякуємо за ваш внесок. Ваш баланс поповнено.</p>
    </div>
  );
};

export default Success;
