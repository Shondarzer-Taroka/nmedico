import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async (request,{ params }) => {
    try {
        let db = await connectDB()
        let email = params.email
        console.log(email);
        
        let blogCollection = db.collection('blog')
        let result = await blogCollection.find({ email }).toArray()
        return NextResponse.json({ message: 'found blogs based on email', result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Not found blogs based on email', error }, { status: 500 })
    }
}
















// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const GET = async (request, { params }) => {
//     try {
//         const db = await connectDB();
//         const { email } = params;

//         console.log(email); // Check if email is being logged

//         const blogCollection = db.collection('blog');
//         const result = await blogCollection.find({ email }).toArray();

//         if (result.length === 0) {
//             return NextResponse.json(
//                 { message: 'No blogs found for the specified email.' },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(
//             { message: 'Blogs found based on email', result },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         return NextResponse.json(
//             { message: 'Failed to fetch blogs based on email', error: error.message },
//             { status: 500 }
//         );
//     }
// };
