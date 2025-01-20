import type {Metadata} from "next";
import "@/app/_styles/globals.css"
import {ClerkProvider} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "CRUX App",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
    <body>
    <ClerkProvider>
      {children}
    </ClerkProvider>
    </body>
    </html>
  );
}
