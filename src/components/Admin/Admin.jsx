"use client";
import React, { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiUser, HiViewBoards, HiTable } from "react-icons/hi";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Admin = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
    const session=useSession()
  useEffect(() => {
    setIsClient(true); // Component is now safe to render on client
  }, []);




  if (!isClient) {
    return null; // Prevent rendering on server
  }

  return (
    <div className="flex">
      <Sidebar aria-label="Sidebar with logo branding example">
        <Sidebar.Logo href="/" img="/logo/nmdn.png" imgAlt="Flowbite logo">
          Nmedico
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Link href="/dashboard/admin/manageUsers" passHref>
              <Sidebar.Item as="a" icon={HiViewBoards}>
                Manage Users
              </Sidebar.Item>
            </Link>
            <Link href="/dashboard/admin/manageCategory" passHref>
              <Sidebar.Item as="a" icon={HiViewBoards}>
                Manage Category
              </Sidebar.Item>
            </Link>
            <Link href="/dashboard/admin/paymentManagement" passHref>
              <Sidebar.Item as="a" icon={HiViewBoards}>
                Payment Management
              </Sidebar.Item>
            </Link>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Sales Report
            </Sidebar.Item>
            <Sidebar.Item className='truncate' href="#" icon={HiShoppingBag}>
              Manage Advertise
        
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              <Link href={'/dashboard/create-blog'}>Create Blog:</Link>
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiUser}>
              <Link className='w-full' href={'/dashboard/my-blogs'}>My Blogs:</Link>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Admin;
