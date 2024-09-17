"use client";
import React from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import Link from 'next/link';

const Seller = () => {
    return (
        <div>
            <Sidebar aria-label="Sidebar with logo branding example">
                <Sidebar.Logo href="/" img="/favicon.svg" imgAlt="Flowbite logo">
                    Flowbite
                </Sidebar.Logo>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie}>
                            Dashboard
                        </Sidebar.Item>

                        <Sidebar.Item icon={HiViewBoards}>
                        
                        <Link href={"/dashboard/seller/manageMedicines"}> Manage Medicines</Link>
                        </Sidebar.Item>
                        
                        <Sidebar.Item href="#" icon={HiInbox}>
                        Payment History
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiUser}>
                        Ask For Advertisement:
                        </Sidebar.Item>
                        <Sidebar.Item  href="#" icon={HiUser}>
                        <Link href={'/dashboard/create-blog'}>Create Blog:</Link>
                        </Sidebar.Item>

                        <Sidebar.Item  href="#" icon={HiUser}>
                        <Link className='w-full' href={'/dashboard/my-blogs'}>My Blogs:</Link>
                        </Sidebar.Item>
                        
                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                            Sign In
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

export default Seller;