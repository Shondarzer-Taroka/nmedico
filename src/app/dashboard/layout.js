
"use client";
// Mark this as a client component
import Admin from "@/components/Admin/Admin";
import Seller from "@/components/Seller/Seller";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";


export default function DashboardLayout({ children }) {
    const [loading, setLoading] = useState(true);
    const session = useSession()
    let pathName = usePathname()
    useEffect(() => {
        setLoading(false)
    }, []);
    console.log(pathName);

    if (session?.data?.user?.role === 'seller') {
        return (
            <div className="flex gap-3">
                <div>
                    <Seller />
                </div>
                {/* Show loading spinner when loading */}
                {loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    children
                )}
            </div>
        );
    }

    if (session?.data?.user?.role === 'admin') {
        return (
            <div className="flex gap-3">
                <div>
                    <Admin />
                    {/* <Seller/> */}
                </div>
                {/* Show loading spinner when loading */}
                {loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    children
                )}
            </div>
        );
    }



}



