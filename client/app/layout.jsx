import { Poppins } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "sonner";
import Context from "./(context)/context";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ['200', '300', '400', '500', '700', '800'] });

export const metadata = {
  title: "Exclusive",
  description: "Welcome to Exclusive, the ultimate e-commerce platform designed to enhance your shopping experience. With ShopEase, you can explore a wide range of products, from fashion and electronics to home essentials and beauty products. Our app offers exclusive deals, personalized recommendations, and a user-friendly interface to make your shopping journey enjoyable and convenient.",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Context>
            <Navbar />
            {children}
            <Footer />
            <Toaster theme='dark' position='top-left' closeButton={true} richColors={true} toastOptions={{
              className: 'toast-font'
            }} />
          </Context>
        </body>
      </html>
    </ClerkProvider>
  );
}
