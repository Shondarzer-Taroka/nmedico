import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CategoryDetails from '@/components/CategoryDetails/CategoryDetails';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import React from 'react';

// Function to get data based on category
const getData = async (category) => {
    try {
        // Make sure to construct the URL correctly
        const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categorydetails/api/${category}`);
        return result.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // or handle error accordingly
    }
};

// React component
const Page = async ({ params }) => {
    const { category } = params; // Destructuring to get category from params
    const data = await getData(category); // Fetching data with category
    const session=await getServerSession(authOptions)
    // console.log(session);
    
    if (!data) {
        return <div>Error fetching data</div>;
    }

    // Example of rendering the fetched data
    return (
        <div>
            {data && <CategoryDetails data={data} owner={session?.user?.email} />}
        </div>
    );
};

export default Page;
