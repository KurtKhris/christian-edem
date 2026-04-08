import React from 'react';
import '../index.css';
import '../App.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import ReduxProvider from '../components/ReduxProvider';
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: 'Christian Edem Kpegah - Software Engineer | UI/UX Designer | Digital Skills Facilitator | Web Developer | Mobile App Developer',
  description: 'Portfolio of Christian Edem Kpegah',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-9SWBXGLZX5" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9SWBXGLZX5');
          `}
        </Script>
      </head>
      <body>
        <ReduxProvider>
          {children}
          <Toaster position="top-right" />
        </ReduxProvider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossOrigin="anonymous" />
        <Analytics />
      </body>
    </html>
  );
}
