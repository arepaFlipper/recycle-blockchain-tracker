import type { Metadata } from "next";
import localFont from "next/font/local";
import "@recycle-chain/ui/src/app/globals.css";
import { ApolloProvider } from "@recycle-chain/network/src/config/apollo";
import { Header } from "@recycle-chain/ui/src/components/organisms/Header";
import { ToastContainer } from '@recycle-chain/ui/src/components/molecules/Toast';
import { Container } from "@recycle-chain/ui/src/components/atoms/Container";

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
  title: "Recycle Blockchain Tracker",
  description: "An application to track the recycling process of waste",
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
          <ToastContainer />
        </body>
      </ApolloProvider>
    </html>
  );
}
