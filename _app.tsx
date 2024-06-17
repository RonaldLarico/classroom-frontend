// /pages/_app.tsx

import Sidebar from '@/components/sidebar/Index';
import '../styles/globals.css'; // Importar estilos globales
import type { AppProps } from 'next/app'; // Importar tipos necesarios
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <Component {...pageProps} />;
    </>
  )
}

export default MyApp;
