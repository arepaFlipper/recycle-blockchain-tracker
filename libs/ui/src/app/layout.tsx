import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ApolloProvider } from '@recycle-chain/network/src/config/apollo';
import { Header } from "../components/organisms/Header";
import { Container } from "../components/atoms/Container";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <Header />
          <Container>{children}</Container>
        </body>
      </ApolloProvider>
    </html>
  );
}
