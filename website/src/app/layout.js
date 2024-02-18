import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MidFade | Redefining the Cut",
  description: "MidFade isn't just a website, it's a thriving community where haircut enthusiasts connect, share inspiration, and redefine the art of the cut together. Explore diverse styles, learn from professionals, and contribute to the future of haircuts in this collaborative space that celebrates shared passion. Join the movement and be part of something bigger.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className}`}>
          <Navbar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
