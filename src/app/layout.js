import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import NavBar from "@/components/NavBar/NavBar";
import 'swiper/css';



const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
    
        <AuthProvider>
          <div className="max-w-6xl mx-auto"> 
          <div>
            <NavBar/>
          </div>
          {children}
          </div>
        </AuthProvider>
      
      </body>
    </html>
  );
}
