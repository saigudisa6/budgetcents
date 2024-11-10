import "@/styles/globals.css";
import '@mantine/core/styles.css';
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <MantineProvider >
    <ModalsProvider></ModalsProvider>
    <UserProvider user={pageProps.user}>
        <Component {...pageProps} />
    </UserProvider>
  </MantineProvider> 
);
}
