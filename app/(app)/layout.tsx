import type {Metadata} from "next";
import "@/app/_styles/globals.css"
import Layout from "@/app/_components/Layout";

export const metadata: Metadata = {
  title: "CRUX App",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}
