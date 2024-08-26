'use client'
import React from 'react';
import { SessionProvider } from "next-auth/react"
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  
  const queryClient = new QueryClient()
const AuthProvider = ({ children }) => {
    // console.log(children);
    return (
        <QueryClientProvider client={queryClient}> 
        <SessionProvider>
            {children}
        </SessionProvider>
        </QueryClientProvider>
    );
};

export default AuthProvider;