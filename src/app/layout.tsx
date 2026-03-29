'use client'
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux";
import store from "../lib/store/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <Provider store={store}>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        </Provider>
        </body>
    </html>
  );
}