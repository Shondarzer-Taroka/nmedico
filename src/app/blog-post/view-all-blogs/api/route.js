// import { connectDB } from "@/lib/connectDB"
// import { NextResponse } from "next/server"

// export const GET = async () => {
//     try {
//         let db = await connectDB()
//         let blogCollection = db.collection('blog')
//         let result = await blogCollection.find().toArray()
//         return NextResponse.json({ message: 'successfully found', result }, { status: 200 })
//     } catch (error) {
//         return NextResponse.json({ message: 'something went to wrong' }, { status: 500 })
//     }
// }








import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        let db = await connectDB();
        let blogCollection = db.collection('blog');
        let result = await blogCollection.find().toArray();
        
        if (!result || result.length === 0) {
            return NextResponse.json({ message: 'No blogs found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blogs successfully found', result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
};
